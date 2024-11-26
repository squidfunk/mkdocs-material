# PDF to Markdown Converter /Pypandoc, PyPDF2

```text
pdf_to_markdown_converter/
│
├── src/
│   └── pdf_to_markdown_converter.py
├── tests/
│   └── test_pdf_to_markdown_converter.py
├── requirements.txt
├── setup.py
├── README.md
├── .gitignore
└── pyproject.toml
```

Now, let's create each of these files:

1. Main script (src/`pdf_to_markdown_converter.py`):

```python
import os
import logging
from datetime import datetime
from pathlib import Path
import pypandoc
import PyPDF2

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def convert_pdfs_to_markdown(input_dir: Path = Path.cwd(), output_dir: Path = Path("ConvertToMD")):
    output_dir.mkdir(exist_ok=True)
    pdf_files = list(input_dir.glob('*.pdf'))
    log_entries = []

    for pdf_file in pdf_files:
        input_file = str(pdf_file)
        output_file = output_dir / f"{pdf_file.stem}.md"

        try:
            pypandoc.convert_file(input_file, 'md', outputfile=str(output_file))
            log_entries.append(f"Successfully converted: {input_file} -> {output_file}")
            logging.info(f"Converted {input_file} to {output_file}")
        except Exception as e:
            try:
                with open(input_file, 'rb') as pdf_file_obj, open(output_file, 'w', encoding='utf-8') as md_file:
                    pdf_reader = PyPDF2.PdfReader(pdf_file_obj)
                    for page in pdf_reader.pages:
                        md_file.write(page.extract_text())
                log_entries.append(f"Converted using PyPDF2: {input_file} -> {output_file}")
                logging.info(f"Converted {input_file} to {output_file} using PyPDF2")
            except Exception as e2:
                log_entries.append(f"Error converting {input_file}: {str(e2)}")
                logging.error(f"Failed to convert {input_file}: {str(e2)}")

    log_file_path = output_dir / "export_log.txt"
    with open(log_file_path, 'w', encoding='utf-8') as log_file:
        log_file.write(f"Export Log - {datetime.now()}\n\n")
        log_file.write("\n".join(log_entries))

    logging.info(f"Conversion complete. Log file saved at: {log_file_path}")

if __name__ == "__main__":
    convert_pdfs_to_markdown()
```

2. Requirements file (requirements.txt):

```text
pypandoc==1.11
PyPDF2==3.0.1
pytest==7.3.1
```

3. Setup file (setup.py):

```python
from setuptools import setup, find_packages

setup(
    name="pdf_to_markdown_converter",
    version="0.1.0",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requires=[
        "pypandoc==1.11",
        "PyPDF2==3.0.1",
    ],
    entry_points={
        "console_scripts": [
            "pdf2md=pdf_to_markdown_converter:convert_pdfs_to_markdown",
        ],
    },
)
```

4. README file (README.md):

```markdown
# PDF to Markdown Converter

This Python script converts PDF files to Markdown format. It uses `pypandoc` as the primary conversion tool, with `PyPDF2` as a fallback option.

## Installation

1. Ensure you have Python 3.7+ installed.
2. Clone this repository:
   ```
   git clone https://github.com/yourusername/pdf_to_markdown_converter.git
   cd pdf_to_markdown_converter
   ```
3. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```
4. Install the required packages:
   ```
   pip install -e .
   ```

## Usage

Run the script from the command line:

```
pdf2md
```

This will convert all PDF files in the current directory to Markdown format and save them in a new "ConvertToMD" folder.

## Development

To set up the development environment:

1. Install development dependencies:
   ```
   pip install -r requirements.txt
   ```
2. Run tests:
   ```
   pytest
   ```

## License

This project is open source and available under the [MIT License](LICENSE).
```

5. Git ignore file (.gitignore):

```text
# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# C extensions
*.so

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# PyInstaller
*.manifest
*.spec

# Installer logs
pip-log.txt
pip-delete-this-directory.txt

# Unit test / coverage reports
htmlcov/
.tox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
.hypothesis/

# Translations
*.mo
*.pot

# Django stuff:
*.log
local_settings.py

# Flask stuff:
instance/
.webassets-cache

# Scrapy stuff:
.scrapy

# Sphinx documentation
docs/_build/

# PyBuilder
target/

# Jupyter Notebook
.ipynb_checkpoints

# pyenv
.python-version

# celery beat schedule file
celerybeat-schedule

# SageMath parsed files
*.sage.py

# Environments
.env
.venv
env/
venv/
ENV/

# Spyder project settings
.spyderproject
.spyproject

# Rope project settings
.ropeproject

# mkdocs documentation
/site

# mypy
.mypy_cache/

# PDF and Markdown files
*.pdf
*.md

# Exclude ConvertToMD directory
ConvertToMD/
```

6. Python project configuration (pyproject.toml):

```toml
[build-system]
requires = ["setuptools>=45", "wheel"]
build-backend = "setuptools.build_meta"

[tool.pytest.ini_options]
testpaths = ["tests"]

[tool.black]
line-length = 100
target-version = ['py37']
include = '\.pyi?$'
extend-exclude = '''
/(
  # directories
  \.eggs
  | \.git
  | \.hg
  | \.mypy_cache
  | \.tox
  | \.venv
  | build
  | dist
)/
'''

[tool.isort]
profile = "black"
line_length = 100
```

7. Test file (tests/test_pdf_to_markdown_converter.py):

```python
import pytest
from pathlib import Path
from src.pdf_to_markdown_converter import convert_pdfs_to_markdown

@pytest.fixture
def temp_dir(tmp_path):
    return tmp_path

def test_convert_pdfs_to_markdown(temp_dir):
    # Create a dummy PDF file
    (temp_dir / "test.pdf").touch()

    # Run the conversion
    convert_pdfs_to_markdown(input_dir=temp_dir, output_dir=temp_dir / "ConvertToMD")

    # Check if the output directory and files were created
    assert (temp_dir / "ConvertToMD").is_dir()
    assert (temp_dir / "ConvertToMD" / "test.md").is_file()
    assert (temp_dir / "ConvertToMD" / "export_log.txt").is_file()

def test_convert_pdfs_to_markdown_no_pdfs(temp_dir):
    # Run the conversion with no PDF files
    convert_pdfs_to_markdown(input_dir=temp_dir, output_dir=temp_dir / "ConvertToMD")

    # Check if the output directory was created but no markdown files
    assert (temp_dir / "ConvertToMD").is_dir()
    assert len(list((temp_dir / "ConvertToMD").glob("*.md"))) == 0
    assert (temp_dir / "ConvertToMD" / "export_log.txt").is_file()
```

To use this project:

1. Create a new directory for your project and navigate to it.
2. Create all the files with the content provided above.
3. Set up a virtual environment:
   ```
   python -m venv venv
   venv\Scripts\activate  # On Windows
   ```
4. Install the project in editable mode:
   ```
   pip install -e .
   ```
5. You can now run the converter using:
   ```
   pdf2md
   ```

This structure follows Python best practices:
- It uses a `src` layout for better packaging.
- It includes a `setup.py` for easy installation and distribution.
- It has a `requirements.txt` file for development dependencies.
- It includes a basic test suite using pytest.
- It uses a `pyproject.toml` file for modern Python tooling configuration.
- It includes a `.gitignore` file for version control.

![6E84ECBD-CF4C-47B7-AAAF-2E5164CA0F35](S5N24xa7s-6E84ECBD-CF4C-47B7-AAAF-2E5164CA0F35.png)