$time = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

if ($args.Count -eq 0) {
    $msg = "update on $time"
} else {
    $msg = "$($args -join ' ') $time"
}

git add .
git commit -m "$msg"
git push
git push github master

Set-Location ..\blog
$sss = "update on $time"
git add .
git commit -m "$sss"
git push
Set-Location ..\cp_code
