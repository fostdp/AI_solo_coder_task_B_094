$env:GOFLAGS="-mod=mod"
$env:GONOSUMCHECK="*"
go test ./internal/era_comparison/... -count=1 -v 2>&1 | ForEach-Object { 
    if ($_ -is [System.Management.Automation.ErrorRecord]) { 
        $_.Exception.Message 
    } else { 
        $_ 
    } 
} | Out-File era_test_output.txt -Encoding utf8
