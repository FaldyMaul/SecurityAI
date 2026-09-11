# Moonshot AI Verify - Technology Stack Documentation

Project Moonshot by AI Verify Foundation is a tool designed to evaluate and red-team LLM applications. Based on the analysis of its repositories, here is a detailed breakdown of its technology stack.

## 1. Backend Stack (Python)

The core engine and APIs of Moonshot are built using Python.

### Core Architecture & Frameworks
- **Language**: Python (>=3.11, <3.12)
- **Web API Framework**: [FastAPI](https://fastapi.tiangolo.com/) (High performance async web framework)
- **ASGI Server**: [Uvicorn](https://www.uvicorn.org/)
- **CLI Framework**: [cmd2](https://github.com/python-cmd2/cmd2) (for building feature-rich command-line applications) and [Rich](https://rich.readthedocs.io/) (for rich text and beautiful formatting in the terminal).
- **Dependency Injection**: `dependency-injector`

### Data Processing & AI Packages
- **Data Manipulation**: `pandas`, `numpy`, `pyarrow`
- **Hugging Face / Datasets**: `datasets`, `huggingface-hub`
- **Serialization & Validation**: `pydantic` (v2.8.2) for strict data validation and schema definitions.
- **Parsing & Templating**: `jinja2`, `pyparsing`, `ijson`

### Build & Package Management
- **Packaging**: `Poetry` and `Hatchling`
- **Dependency Management**: `tool.poetry` in `pyproject.toml`

### Development & Testing
- **Testing**: `pytest`, `pytest-asyncio`, `pytest-cov`, `pytest-mock`
- **Code Formatting & Linting**: `black`, `isort`, `flake8`, `pre-commit`
- **Documentation**: `mkdocs`, `mkdocs-material`

---

## 2. Frontend Stack (Node.js)

The user interface for Moonshot is built as a modern web application.

### Core Framework
- **Framework**: [Next.js](https://nextjs.org/) (React framework for SSR and static generation) - version 14.x
- **UI Library**: [React](https://reactjs.org/) (Version 18)
- **Language**: TypeScript (Version 5.8)

### Styling & UI
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS framework)
- **Utility Libraries**: `clsx`, `tailwind-merge` (for dynamic class name construction)
- **Components**: `react-select` (for advanced dropdown/select elements)

### State Management
- **State Architecture**: [Redux Toolkit](https://redux-toolkit.js.org/) (`@reduxjs/toolkit`) paired with `react-redux` (version 9.0)

### Forms, Validation & Utilities
- **Form Handling**: `formik`
- **Schema Validation**: `yup`, `zod`
- **PDF Generation**: `html2pdf.js`
- **Data Fetching**: `cross-fetch`
- **SVG rendering**: `canvg`

### Development & Testing
- **Testing Framework**: [Jest](https://jestjs.io/) along with React Testing Library (`@testing-library/react`, `@testing-library/jest-dom`)
- **Linting & Formatting**: `eslint` (with `eslint-config-next`), `prettier`

---

## 3. Key Observations

- **Modular Architecture**: The backend uses optional dependency groups (e.g., `web-api`, `cli`, `all`), allowing it to be run minimally as just a CLI tool or fully as a Web API.
- **Modern Standards**: They utilize modern, strict typed tools in both backend (`pydantic` v2, Python 3.11+, `FastAPI`) and frontend (`TypeScript`, `zod`, `React 18`, `Next.js 14`).
- **Data Intensive**: The heavy use of `pandas`, `numpy`, and connection to `huggingface-hub` / `datasets` shows its clear orientation towards ML model evaluation and dataset handling.
