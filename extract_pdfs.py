import pypdf
import sys

def extract_to_file(pdf_path, txt_path):
    try:
        with open(pdf_path, 'rb') as f:
            reader = pypdf.PdfReader(f)
            text = ""
            for i in range(min(15, len(reader.pages))):
                text += reader.pages[i].extract_text() + "\n"
        with open(txt_path, 'w', encoding='utf-8') as out_f:
            out_f.write(text)
        print(f"Extracted to {txt_path}")
    except Exception as e:
        print(f"Error reading {pdf_path}: {e}")

extract_to_file(r"D:\Work\PAM\SecurityAI\Research\Crosswalk-AIV-and-ISO42001-final.pdf", r"D:\Work\PAM\SecurityAI\Research\iso_extract.txt")
extract_to_file(r"D:\Work\PAM\SecurityAI\Research\AI_RMF_and_AI_Verify_Crosswalk.pdf", r"D:\Work\PAM\SecurityAI\Research\nist_extract.txt")
