# PowerShell Script to Sync Taiga User Stories to Markdown Backlog

$csvUrl = "https://projects.digitaltelkom.id/api/v1/userstories/csv?uuid=b41dfb131df74670a2dc50b027e58c8c"
$outputFile = "d:\Work\PAM\SecurityAI\1_3_BACKLOG.md"

try {
    # 1. Download CSV Content to Persistent File
    $csvPath = "d:\Work\PAM\SecurityAI\taiga_data.csv"
    $jsonPath = "d:\Work\PAM\SecurityAI\taiga_data.json"
    
    Write-Host "Fetching User Stories to $csvPath..."
    Invoke-WebRequest -Uri $csvUrl -OutFile $csvPath -UseBasicParsing
    
    # 2. Parse CSV
    $csvData = @(Import-Csv -Path $csvPath -Encoding UTF8)
    
    # 3. Export to JSON for tracking
    $csvData | ConvertTo-Json -Depth 4 | Out-File $jsonPath -Encoding utf8
    Write-Host "Exported JSON to $jsonPath"
    
    Write-Host "CSV Imported. Row Count: $($csvData.Count)"
    
    # 4. Start Markdown Content
    $markdown = @"
# Product Backlog: Security for AI
*(Auto-synced from Taiga. Last updated: $(Get-Date -Format "yyyy-MM-dd HH:mm"))*

## Sprint 1-2: Foundation & Definitions

"@

    Write-Host "CSV Imported. Row Count: $($csvData.Count)"
    
    # 4. Loop through CSV data and format as Markdown
    foreach ($row in $csvData) {
        # Debug print
        Write-Host "Processing row: $($row.subject)"

        # Only process items with a valid Subject
        if (-not [string]::IsNullOrWhiteSpace($row.subject)) {
            $desc = $row.description
            if ([string]::IsNullOrWhiteSpace($desc)) {
                 $desc = $row.Description
            }
            
            # Formatting execution steps if they exist in description (Taiga export puts rich text in description)
            # This is a basic cleanup to ensure it looks okay in MD
            $desc = $desc -replace "<br>", "`n" -replace "Acceptance Criteria", "**Acceptance Criteria**" -replace "Langkah Praktikal / Teknis", "**Execution Steps**"
            
            $markdown += "| ID | Title | Assignee | Status |`n"
            $markdown += "| :--- | :--- | :--- | :--- |`n"
            $assignee = $row.assigned_to_full_name
            
            # Fallback Logic: If Taiga CSV is stale/empty/default, map to Project Plan owners
            if ([string]::IsNullOrWhiteSpace($assignee) -or $assignee -match "Anggy Edo Prasetya") {
                if ($row.subject -match "Classify data") { $assignee = "Bayu Priyatna" }
                elseif ($row.subject -match "Leakage") { $assignee = "Data Team (Dhiaul / Jabbar)" }
                elseif ($row.subject -match "Exposure|Infrastructure") { $assignee = "Beno (Infra)" }
                elseif ($row.subject -match "Unsafe behavior|Prompt injection") { $assignee = "Ardy / Blue Team" }
                elseif ($row.subject -match "Red team") { $assignee = "Red Team (Wawan, Dicky)" }
                elseif ($row.subject -match "Blue team") { $assignee = "Blue Team (Danar, Fajar)" }
                else { $assignee = "Unassigned" }
            }

            $markdown += "| **#$($row.ref)** | **$($row.subject)** | $assignee | $($row.status) |`n"
            
            # Add description if available (simplified for table view or expandable)
            if (-not [string]::IsNullOrWhiteSpace($desc)) {
               # Format description for table cell (replace newlines with <br>)
               $cleanDesc = $desc -replace "`n", "<br>" -replace "### ", "<br>**" -replace "---------", ""  -replace "\* \* \*", ""
               # Truncate if too long or keep specific sections? Keeping it all but compacted.
               $markdown += "| | $cleanDesc | | |`n"
            }
            
            $markdown += "`n"
        }
    }
    
    # 5. Add Static Future Backlog (Optional: You can keep the static parts if they are not in Taiga)
    $markdown += @"

## Future Backlog (Scope-Based)
*(Derived from static Project Plan, not yet in Taiga User Stories)*

### Control Plane & Gateway
- [ ] Design API Gateway Architecture for AI Models
- [ ] Implement Apilogy Integration with Datadog
- [ ] Configure centralized logging for AI Model access

### Runtime Guardrails
- [ ] Implement Input Validation for Prompt Injection
- [ ] Implement Output Filtering for PII/Data Leakage
- [ ] Develop "Circuit Breaker" for unsafe AI responses

### Secure RAG
- [ ] Define RBAC Roles for RAG knowledge base
- [ ] Implement Document-Level Access Control
- [ ] Audit RAG query logs

### Monitoring & Incident Response
- [ ] Set up Datadog Dashboards for AI Security Metrics
- [ ] Draft Operational SOPs for AI Misuse
- [ ] Conduct Tabletop Exercise for AI Incident Response

### Governance & Standardization
- [ ] Draft AI Security Baseline v0.1
- [ ] Review Baseline with External Units (RMU, CYS)
- [ ] Finalize AI Ethics Guidelines
"@

    # 6. Save to File
    $markdown | Out-File -FilePath $outputFile -Encoding utf8
    Write-Host "Successfully updated backlog at $outputFile"

} catch {
    Write-Error "Failed to sync backlog: $_"
}
