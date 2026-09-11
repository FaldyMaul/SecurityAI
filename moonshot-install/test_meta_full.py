import os
import sys
import traceback
import json

os.environ["MOONSHOT_DATA_DIR"] = r"d:\Work\PAM\SecurityAI\moonshot-install\moonshot-data"

from moonshot.src.api.api_environment_variables import api_set_environment_variables
api_set_environment_variables({
    "DATABASES": os.path.join(os.environ["MOONSHOT_DATA_DIR"], "generated-outputs", "databases"),
    "LOGS": os.path.join(os.environ["MOONSHOT_DATA_DIR"], "generated-outputs", "logs"),
    "CONNECTORS": os.path.join(os.environ["MOONSHOT_DATA_DIR"], "connectors"),
    "CONNECTORS_ENDPOINTS": os.path.join(os.environ["MOONSHOT_DATA_DIR"], "connectors-endpoints"),
    "RECIPES": os.path.join(os.environ["MOONSHOT_DATA_DIR"], "recipes"),
    "COOKBOOKS": os.path.join(os.environ["MOONSHOT_DATA_DIR"], "cookbooks"),
    "METRICS": os.path.join(os.environ["MOONSHOT_DATA_DIR"], "metrics"),
    "DATASETS": os.path.join(os.environ["MOONSHOT_DATA_DIR"], "datasets"),
    "PROMPT_TEMPLATES": os.path.join(os.environ["MOONSHOT_DATA_DIR"], "prompt-templates"),
})

# Patch python path manually to avoid IO_MODULES issues
sys.path.append(r"d:\Work\PAM\SecurityAI\moonshot-install\venv_311\Lib\site-packages")

from moonshot.src.api.api_cookbook import api_get_all_cookbook

try:
    print("Running api_get_all_cookbook")
    cookbooks = api_get_all_cookbook()
    print("Success:", len(cookbooks))
except Exception as e:
    err_dict = {
        "type": type(e).__name__,
        "message": str(e),
        "traceback": traceback.format_exc()
    }
    with open("meta_full_err.json", "w") as f:
        json.dump(err_dict, f, indent=4)
