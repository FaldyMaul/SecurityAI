import traceback
import sys

def test_tokenizer():
    print("Testing AutoTokenizer import...")
    try:
        from transformers import AutoTokenizer
        print("AutoTokenizer imported successfully.")
        
        print("Testing AutoTokenizer.from_pretrained...")
        tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
        print("Successfully loaded bert-base-uncased tokenizer.")
    except Exception as e:
        print("\n--- Model loading failed ---")
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    test_tokenizer()
