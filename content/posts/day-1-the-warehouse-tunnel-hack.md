---
title: "The 'Warehouse Tunnel' Hack"
slug: "day-1-the-warehouse-tunnel-hack"
excerpt: "How I routed a local Django server to Vercel and survived the CORS preflight bloodbath."
published_at: "2026-05-15T07:49:15Z"
meta_title: "The 'Warehouse Tunnel' Hack | Karthik Kodes"
meta_description: "An in-depth step-by-step guide to hosting your Django backend locally via Ngrok while keeping Next.js Vercel frontend active."
github_url: "https://github.com/Karthik-vangapandu8/portfolio"
---

## The Architecture: Cloud Storefront, Local Warehouse

Here was the challenge: My Next.js frontend was live on Vercel's global CDN edge network. However, my Django backend database was hosted on my laptop inside my home workspace. 

It was like having a beautiful storefront in the city center while my warehouse was locked in my basement 100 miles away.

The core problem? **IP Rotations.** Every time I restart my local router, my laptop's public IP address changes. Hardcoding local IPs was out of the question, and buying a VPS immediately would have killed my development velocity. 

So, I built a tunnel.

```
[Vercel Frontend] ──(HTTPS)──> [Ngrok Tunnel Edge] ──(Secure Tunnel)──> [Local Laptop:8001]
```

> [!WARNING]
> **Production Disclaimer:** This tunnel setup is a developer "cheat code" and temporary experiment for fast feedback. Exposing your local machine directly to the public internet lacks basic security controls, firewall protection, and scalability. Do **not** run live production databases or APIs over an Ngrok bridge. Use a dedicated VPS or serverless platform for production releases.

---

## Step 1: Establishing the Secure Bridge

Instead of setting up static routes or firewall policies, I used **Ngrok** to expose port `8001` (where my Django server runs) to the public internet securely:

```bash
ngrok http 8001
```

Ngrok immediately spun up a forwarding URL:
```text
Forwarding  https://3990-2a09-bac1-3680-ba8-00-176-79.ngrok-free.app -> http://localhost:8001
```

Now, any fetch request sent to that HTTPS address routing through Ngrok’s edge would land directly on my laptop's local port.

---

## Step 2: The CORS Preflight Bloodbath

When I first triggered the fetch from Vercel to my new tunnel, my browser console exploded with red warnings:

```text
Access to fetch at 'https://3990-...' from origin 'https://karthikkodes.vercel.app' 
has been blocked by CORS policy: Response to preflight request doesn't pass access control check.
```

When a browser makes a cross-origin request (Vercel to Ngrok), it first sends an `OPTIONS` request (a **preflight request**) to check if the server permits the communication. 

My Django backend was returning `403 Forbidden` on the preflight check. 

### The Solution: Django Settings Autopsy

To fix this, we needed to make three changes in `backend/core/settings.py`:

1. **Middleware Priority**: In Django, middleware is executed sequentially. If security middleware runs before the CORS headers are attached, the preflight request gets rejected before CORS can declare it safe. I moved `CorsMiddleware` to the absolute **#1 position**:

```python
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware", # MUST BE FIRST
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    # ...
]
```

2. **Explicit CORS Whitelist**: Instead of generic settings, we explicitly opened the gates for preflights:

```python
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [
    "DELETE", "GET", "OPTIONS", "PATCH", "POST", "PUT"
]
```

---

## Step 3: Bypassing the Ngrok Warning Interstitial

Even after fixing CORS, Vercel was still crashing with a generic Next.js `fetch failed` error. 

Why? Because Ngrok's free tier intercepts the very first browser request to a tunnel and serves an HTML warning page asking the visitor if they trust the owner:

```text
ERR_NGROK_3200: You are about to visit a tunnel endpoint...
```

Vercel's server-side rendering engine was trying to read JSON, but got this HTML warning page instead. Since `<DOCTYPE html>` isn't valid JSON, Next.js choked.

### The Bypass Header Fix

To bypass this check programmatically, we must inject a custom header (`ngrok-skip-browser-warning`) with any value into every single outbound fetch request on the frontend:

```typescript
export async function getPosts() {
  const response = await fetch(`${API_BASE_URL}/posts/`, {
    headers: {
      "ngrok-skip-browser-warning": "true", // The magic key
    },
    next: { revalidate: 3600 },
  });
  return response.json();
}
```

By adding this header, Ngrok skips the warning page entirely, serving raw Django API responses straight to Vercel.

---

## Autopsy Summary

* **Ngrok** is a powerful velocity tool, but its warning page will break server-side API fetches unless bypassed.
* **CORS Middleware order** in Django settings is critical. If it runs after security middleware, preflights will fail silently.
* **Cheat Code Warning**: Use tunneling strictly for local prototyping. Avoid it for real production workloads. Move to a VPS once initial feedback is validated.
