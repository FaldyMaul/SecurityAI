import traceback
import sys
import os

os.environ["MOONSHOT_DATA_DIR"] = r"d:\Work\PAM\SecurityAI\moonshot-install\moonshot-data"

sys.path.append(r"d:\Work\PAM\SecurityAI\moonshot-install\venv_311\Lib\site-packages")

try:
    from moonshot.src.utils.import_modules import get_instance
    from moonshot.src.configs.env_variables import EnvVariables
    from moonshot.src.storage.storage import Storage

    get_instance("answercorrectness", Storage.get_filepath(EnvVariables.METRICS.name, "answercorrectness", "py"))
except Exception as e:
    with open("ans_err.txt", "w") as f:
        traceback.print_exc(file=f)
