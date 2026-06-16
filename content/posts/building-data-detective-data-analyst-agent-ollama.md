---
title: "Building 'Data-Detective': A Custom Data Analyst Agent using Ollama from Scratch"
slug: "building-data-detective-data-analyst-agent-ollama"
excerpt: "An in-depth breakdown of typing, Pydantic, and Enums used to define type-safe model providers for our custom data analyst agent, Data-Detective."
published_at: "2026-06-15T12:00:00Z"
meta_title: "Building Data-Detective with Ollama | Karthik Kodes"
meta_description: "Learn python type safety, Pydantic validation, and custom enums while building Data-Detective, a data analyst AI agent with Ollama."
github_url: "https://github.com/Karthik-vangapandu8/data-detective/tree/main/data-detective"
featured_image: "/blog/images/data-detective-cover.png"
---

When building autonomous AI agents from scratch, reliability is your greatest bottleneck. Large Language Models (LLMs) are inherently probabilistic, but your software architecture must be deterministic. This is especially true when building a data analyst agent—which we will call **Data-Detective**—whose job is to write database queries, inspect schemas, and compile analysis reports without human supervision.

If a data analyst agent hallucinates a database column name or attempts to run a query using an invalid engine parameter, the execution loop breaks. To prevent this, we must build a sturdy, type-safe foundation.

---

### Prerequisites for Anyone Building Agents

Before you write a single line of agent loops, you must be comfortable with four core concepts:

* **Level-1 Python Typing**: You need to understand `List`, `Dict`, and `Optional` so you can define what data goes where.
* **Validation Over Parsing**: Knowing how to use Pydantic to validate data schemas rather than doing manual string manipulation.
* **Dynamic Prompting**: Understanding Jinja2 templating to dynamically build instructions for the LLM.
* **The "Protocol" Pattern**: Knowing how to define clean, decoupled interfaces for third-party APIs (like Ollama or Gemini).

---

Before writing the SQL execution engine or the prompt templates for **Data-Detective**, we start by defining the model providers that run our core agent loop. Here is the foundation block of code:

```python
from typing import List, Optional, Dict, Tuple, Any, Protocol, runtime_checkable
from pydantic import BaseModel, Field, field_validator
from enum import Enum


class ModelProvider(Enum):
    """Enum for supported model providers."""

    OLLAMA = "ollama"
    GEMINI = "gemini"
```

While this snippet looks simple, it contains four essential Python concepts that form the spine of agentic software. Let's break down each element line-by-line to understand what they do, why they are used, and how they protect our **Data-Detective** agent at runtime.

---

## 1. What is the `typing` Module and Why Do We Need It?

Python is a **dynamically-typed** language, meaning variable types are resolved at runtime rather than compile-time. While this allows for rapid prototyping, it becomes a liability when writing complex systems like **Data-Detective**, where a mismatched type (such as passing a raw string instead of a structured dictionary of SQL parameters) can crash your pipeline.

To solve this, Python 3.5 introduced the `typing` module to support **Type Hints** (annotations).

```python
from typing import List, Optional, Dict, Tuple, Any, Protocol, runtime_checkable
```

### Why Import from `typing`?
Type hints act as a code contract. While they are ignored by the Python interpreter at runtime (yielding zero performance overhead), they are heavily analyzed by **static analysis tools** (like `mypy`, Pyright, or your IDE's language server) to flag errors before you execute the code.

Here is what each imported component does:
* **`List`, `Dict`, `Tuple`**: Used to specify generic container types (e.g., `List[str]` for table columns, `Dict[str, Any]` for a row of SQL query results, `Tuple[str, str]` for key-value column mappings).
* **`Optional`**: Tells Python that a value can either be of a specific type or `None` (e.g., `Optional[str]` is equivalent to `str | None`, useful for optional DB passwords).
* **`Any`**: A fallback wildcard representing any type, disabling type checks for that variable.
* **`Protocol`**: Enables **structural subtyping** (often called "static duck typing"). For instance, our agent needs to run database queries. Instead of hardcoding a specific database driver, we can define a database protocol:
  ```python
  class SQLDatabase(Protocol):
      def execute_query(self, sql: str) -> List[Dict[str, Any]]: ...
  ```
  Any class (SQLite, PostgreSQL, BigQuery) that implements this signature automatically satisfies the protocol without needing explicit inheritance.
* **`runtime_checkable`**: Normally, protocols are only checked statically. By decorating a `Protocol` with `@runtime_checkable`, we can perform runtime assertions like `isinstance(database_driver, SQLDatabase)` inside our agent.

---

## 2. Module vs. Library vs. Package: The Python Hierarchy

To organize **Data-Detective**, we need to clarify how our files fit into the Python structure:

| Concept | What It Is | Example |
| :--- | :--- | :--- |
| **Module** | A single `.py` file containing code, classes, or functions. | `models.py` |
| **Package** | A directory containing multiple modules and an `__init__.py` file. | `hiring_agent/` or `detective_core/` |
| **Library** | A collection of related packages or modules designed for reuse. | `pydantic` or `requests` |

* **Module**: The smallest unit of code sharing. When you write a file like `models.py` to define configurations, that file is a module.
* **Package**: Allows you to group modules hierarchical using dot notation. For instance, importing `from detective_core.database import SQLiteConnector`.
* **Library**: A broader term. It could refer to a standard library shipped with Python (like `typing` or `enum`) or external libraries installed via package managers like `pip` or `uv` (like `pydantic` or `sqlalchemy`).

---

## 3. How Pydantic Helps: Enforcing Structured Tool Calling

```python
from pydantic import BaseModel, Field, field_validator
```

While type hints declare intent, they **do not enforce it** at runtime. If an LLM returns a string when our database driver expects a list of query arguments, Python will let the program execute until it crashes. 

**Pydantic** is a library that enforces type safety at runtime.

### The Role of Pydantic in 'Data-Detective'
For a data analyst agent to be useful, it must generate database queries. Since LLMs return text (often in the form of raw JSON strings), we need a way to parse, clean, and validate that text into structured Python objects. Pydantic is the industry standard for this:

1. **`BaseModel`**: You define your tool parameters by subclassing `BaseModel`. Pydantic automatically parses input dictionaries and instantiates the model, validating all types on the fly.
2. **`Field`**: Allows you to add metadata and validation rules to individual fields. It supports ranges, string matching, and custom descriptions:
   ```python
   class SQLQueryTool(BaseModel):
       query: str = Field(description="The SELECT query to execute against the SQLite database.")
       row_limit: int = Field(default=10, ge=1, le=100, description="Max number of rows to return.")
   ```
   *Note: These description tags are exported to JSON Schema and fed directly to Ollama to help it understand the exact expected structure for tool calling.*
3. **`field_validator`**: A decorator used to write custom validation logic. For **Data-Detective**, we want to ensure the agent doesn't execute destructive commands (like `DROP TABLE` or `DELETE`):
   ```python
   @field_validator("query")
   @classmethod
   def check_read_only(cls, v: str) -> str:
       forbidden_keywords = ["drop", "delete", "truncate", "insert", "update"]
       if any(kw in v.lower() for kw in forbidden_keywords):
           raise ValueError("Data-Detective is restricted to read-only queries.")
       return v
   ```

If the agent generates an invalid query or tries to run a write operation, Pydantic raises a validation error. The agent catches this error, feeds it back to Ollama, and asks the model to correct its mistakes.

---

## 4. The Crucial Role of Enumeration (`Enum`)

Finally, we define the supported models using an enumeration class:

```python
from enum import Enum

class ModelProvider(Enum):
    """Enum for supported model providers."""

    OLLAMA = "ollama"
    GEMINI = "gemini"
```

An **enumeration** is a set of symbolic names bound to unique, constant values. 

### Why Enums are Crucial for Data-Detective:
* **String Hardcoding Prevention**: Without Enums, you might pass a string like `"ollama"` or `"gemini"` around your application. A single typo like `"olama"` or `"gemin"` would bypass static checks and cause silent runtime crashes when making requests.
* **Autocompletion**: IDEs understand enums. Typing `ModelProvider.` will display auto-suggestions for all valid providers.
* **Explicit Configuration**: Enums serve as documentation. Any developer reading the code immediately knows exactly which LLM backends are supported.
* **Easy Updates**: If you want to support Anthropic's Claude, you only need to add `CLAUDE = "claude"` to this Enum class. The rest of the codebase will automatically respect the new option.

With these foundations set—a robust type-safety skeleton, schema validations, and restricted Enums—our **Data-Detective** agent is ready to securely parse LLM inputs. 

In the next article, we will build on this setup to define the model client orchestrator and execute our first database analysis!
