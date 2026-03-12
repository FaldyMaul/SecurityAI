import { Badge } from '@legion-ui-kit/react-core';

interface OWASPBadgeProps {
  category:
    | 'llm01_prompt_injection'
    | 'llm02_insecure_output_handling'
    | 'llm03_training_data_poisoning'
    | 'llm06_sensitive_information_disclosure'
    | 'llm08_excessive_agency'
    | 'other';
  size?: 'sm' | 'md';
}

const LABELS: Record<OWASPBadgeProps['category'], string> = {
  llm01_prompt_injection: 'OWASP LLM01 Prompt Injection',
  llm02_insecure_output_handling: 'OWASP LLM02 Insecure Output Handling',
  llm03_training_data_poisoning: 'OWASP LLM03 Training Data Poisoning',
  llm06_sensitive_information_disclosure: 'OWASP LLM06 Sensitive Info Disclosure',
  llm08_excessive_agency: 'OWASP LLM08 Excessive Agency',
  other: 'OWASP Other Risk',
};

const VARIANT: Record<OWASPBadgeProps['category'], 'danger' | 'warning' | 'info'> = {
  llm01_prompt_injection: 'danger',
  llm02_insecure_output_handling: 'warning',
  llm03_training_data_poisoning: 'danger',
  llm06_sensitive_information_disclosure: 'danger',
  llm08_excessive_agency: 'warning',
  other: 'info',
};

export function OWASPBadge({ category, size = 'sm' }: OWASPBadgeProps) {
  return <Badge color={VARIANT[category] as never} size={size as never} label={LABELS[category]} />;
}
