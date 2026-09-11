import os
import sys
import traceback
from moonshot.src.metrics.metric import Metric

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
    "IO_MODULES": "moonshot.src.io_modules",
})

# Patch python path manually
sys.path.append(r"d:\Work\PAM\SecurityAI\moonshot-install\venv_311\Lib\site-packages")

metrics_dir = r"d:\Work\PAM\SecurityAI\moonshot-install\moonshot-data\metrics"

results = []
for file in os.listdir(metrics_dir):
    if file.endswith('.py') and not file.startswith('__'):
        metric_id = file[:-3]
        try:
            from moonshot.src.utils.import_modules import get_instance
            from moonshot.src.configs.env_variables import EnvVariables
            from moonshot.src.storage.storage import Storage
            # Import physically first to catch metaclass conflicts
            get_instance(metric_id, Storage.get_filepath(EnvVariables.METRICS.name, metric_id, "py"))
            results.append(f"SUCCESS: {metric_id}")
        except Exception as e:
            if "metaclass conflict" in str(e):
                results.append(f"BINGO CONFLICT: {metric_id}")
            else:
                results.append(f"ERROR: {metric_id} - {type(e).__name__}: {str(e)[:50]}")

with open("bulk_meta_out.txt", "w") as f:
    f.write("\n".join(results))
