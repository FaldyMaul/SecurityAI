import os
import traceback
from moonshot.src.metrics.metric import Metric

metrics_dir = r"d:\Work\PAM\SecurityAI\moonshot-install\moonshot-data\metrics"
for file in os.listdir(metrics_dir):
    if file.endswith('.py') and not file.startswith('__'):
        metric_id = file[:-3]
        try:
            Metric.load(metric_id)
            print(f"Loaded {metric_id} successfully")
        except Exception as e:
            err_str = str(e)
            if "requirements defined correctly" in err_str or "AutoTokenizer" in err_str:
                print(f"BINGO: {metric_id} failed with:")
                traceback.print_exc()
            else:
                print(f"Failed {metric_id}: {type(e).__name__} - {err_str}")
