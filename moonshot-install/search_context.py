import os
directory = r"d:\Work\PAM\SecurityAI\moonshot-install\venv_311\Lib\site-packages"
for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(".py"):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                    if "ContextOverflowError" in content:
                        print(f"FOUND IN: {filepath}")
            except Exception:
                pass
