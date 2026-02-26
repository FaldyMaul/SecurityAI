import sys
from pathlib import Path

try:
    import pypdf
except ImportError:
    print("pypdf not installed. Please install it with 'pip install pypdf'")
    sys.exit(1)

def extract_summary(pdf_path, max_pages=15):
    pdf_file = Path(pdf_path)
    if not pdf_file.exists():
        print(f"File not found: {pdf_path}")
        return
    
    print(f"--- Extracting {pdf_file.name} ---")
    try:
        reader = pypdf.PdfReader(str(pdf_file))
        text = ""
        for i in range(min(max_pages, len(reader.pages))):
            page_text = reader.pages[i].extract_text()
            if page_text:
                text += page_text + "\n"
        
        out_path = pdf_file.with_suffix('.txt')
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Saved {max_pages} pages to {out_path.name}\n")
    except Exception as e:
        print(f"Error reading {pdf_file.name}: {e}")

if __name__ == "__main__":
    folder = Path(r"D:\Work\PAM\SecurityAI\Research")
    pdfs = [
        "Assurance-Pilot-Main-Report.pdf",
        "Cataloguing_LLM_Evaluations_Singapore.pdf",
        "ai-growth-lab-call-for-evidence.pdf",
        "large-language-model-starter-kit-IMDA.pdf"
    ]
    for pdf in pdfs:
        extract_summary(folder / pdf)
