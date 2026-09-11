import os
import sys

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

import traceback
from moonshot.src.api.api_cookbook import api_get_all_cookbook

try:
    api_get_all_cookbook()
except Exception:
    with open('full_error.txt', 'w') as f:
        traceback.print_exc(file=f)
