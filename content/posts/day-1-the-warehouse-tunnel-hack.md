---
title: "Day 1: The 'Warehouse Tunnel' Hack"
slug: "day-1-the-warehouse-tunnel-hack"
excerpt: "How I exposed my local backend to the world in 5 minutes using Ngrok."
published_at: "2026-05-15T07:49:15Z"
meta_title: "Day 1: Using Ngrok for Building in Public"
meta_description: "A quick hack to host your backend locally while keeping your frontend live on Vercel."
github_url: "https://github.com/Karthik-vangapandu8/portfolio"
---

## The Problem

I had my frontend live on Vercel, but my backend was stuck on my local machine. It was like having a beautiful storefront in the city center while my warehouse was locked in my house 100 miles away. The key? My laptop's IP address, which changes every time I restart my router.

## The Solution: Tunneling

Instead of rushing to buy a VPS and spending 3 hours on a "bloodbath" server migration, I used **Ngrok**. Ngrok creates a secure tunnel from the public internet directly to a port on my local machine.

```bash
ngrok http 8001
```

## Why this matters

Building in public isn't about having the perfect infrastructure on Day 1. It's about **velocity**. By using a tunnel, I was able to go live in 5 minutes and start sharing my progress with you all. Tomorrow, we'll talk about the real deal: Moving to a dedicated Linux server on DigitalOcean.

> "Don't let the lack of a server stop you from sharing your code."
