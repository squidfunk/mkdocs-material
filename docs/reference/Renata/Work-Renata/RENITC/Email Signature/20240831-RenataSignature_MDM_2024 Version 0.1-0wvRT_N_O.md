# RenataSignature_MDM_2024 Version 0.1



In diesem Skript habe ich die folgenden Änderungen vorgenommen Beat:

1. Verwendung von `Get-ADUser` zum Abrufen der Benutzerattribute aus Active Directory.
2. Verwendung von PowerShell-Cmdlets für die Datei- und Ordnerverwaltung, z.B. `Test-Path`, `New-Item`, `Remove-Item` und `Copy-Item`.
3. Verwendung von Here-Strings (`@"..."@`) für die HTML-, TXT- und RTF-Vorlagen, um die Lesbarkeit zu verbessern.
4. Verwendung von `Set-Content` zum Schreiben der Signaturdateien.
5. Verwendung von `New-Object -ComObject Outlook.Application` zum Festlegen der Standardsignatur in Outlook.
---
RenataSignature_MDM_2024.ps1
```powershell
# RenataSignature_MDM_2024.ps1

$sigName = "Renata SA"
$generalPhone = "+41 61 975 7575"
$group1 = "A company of "
$group2 = "The SWATCH GROUP"
$rootCert1 = "If you cannot verify the digital signature, please click "
$rootCert2 = "here"
$rootCert3 = " to download"
$rootCert4 = "the root certificate."
$rootCertURL = "http://pki.swatchgroup.com/cert/SGRCHGR046_Swatch Group Root CA.crt"
$separator = "&ensp;|&ensp;"
$textPhone = "Phone: "
$textPhoneDE = "Phone DE: "
$textPhoneFR = "Phone FR: "
$textPhoneIT = "Phone IT: "
$textDirect = "Direct: "
$textMobile = "Mobile: "

$logoHTML = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAAAXCAYAAAAfiPFCAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5AIUDSYBWLtAfQAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvmCC"

$bannerWidth = "0"
$bannerHeight = "0"
$bannerURL = "http://www.xxx.com"
$bannerPic = ""

$updateStyle = $true

$user = Get-ADUser -Identity $env:username -Properties Name, GivenName, Title, Company, StreetAddress, PostalCode, City, Country, EmailAddress, OfficePhone, MobilePhone, Department, HomePhone

$name = $user.Name
$givenName = $user.GivenName
$title = $user.Title -split " Ķ "
$company = $user.Company
$address = $user.StreetAddress
$postalCode = $user.PostalCode
$city = $user.City
$country = $user.Country
$email = $user.EmailAddress
$phone = $user.OfficePhone
$mobile = $user.MobilePhone
$info = $user.Department
$pager = $user.HomePhone

$sigFolder = "$env:APPDATA\Microsoft\Signatures\"
if (-not (Test-Path $sigFolder)) {
    New-Item $sigFolder -ItemType Directory | Out-Null
}

$outlookFolder = "$env:LOCALAPPDATA\Microsoft\Outlook\"
$ostName = Get-ChildItem -Path $outlookFolder -Filter "*.ost" | Select-Object -ExpandProperty BaseName

$htmFile = Join-Path $sigFolder "$sigName.htm"
$rtfFile = Join-Path $sigFolder "$sigName.rtf"
$txtFile = Join-Path $sigFolder "$sigName.txt"

if ($ostName) {
    $htmFileOST = Join-Path $sigFolder "$sigName ($ostName).htm"
    $rtfFileOST = Join-Path $sigFolder "$sigName ($ostName).rtf"
    $txtFileOST = Join-Path $sigFolder "$sigName ($ostName).txt"
}

$filesToRemove = @($htmFile, $rtfFile, $txtFile)
if ($ostName) {
    $filesToRemove += @($htmFileOST, $rtfFileOST, $txtFileOST)
}

foreach ($file in $filesToRemove) {
    if (Test-Path $file) {
        Remove-Item $file -Force
    }
}

$fullName = $name
if ($givenName) { $fullName = "$givenName $fullName" }
if ($info) { $fullName += ", $info" }

$line = @{
    0 = $fullName
    1 = ""
    2 = "$textPhone$generalPhone"
    3 = ""
    4 = "$textDirect$phone"
    5 = $email
}

if ($title[0]) { $line[0] += "$separator$($title[0])" }
if ($title.Count -gt 1) { $line[1] = $title[1] }

if ($pager) {
    $foreignPhone = switch -Regex ($pager) {
        "^\+49" { $textPhoneDE }
        "^\+33" { $textPhoneFR }
        "^\+39" { $textPhoneIT }
        Default { $textPhone }
    }
    $line[2] = "$foreignPhone$pager"
    $line[3] = $line[2]
}

if ($mobile) {
    $line[4] += "$separator$textMobile$mobile"
}

$location = "$postalCode $city, $country"

$htmlContent = @"
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">
<title></title>
</head>
<body>
<p>
<table style="width:400px; border-collapse:collapse; border:none; color:#000000; font-family:Arial; font-size:7.5pt;">
<tr>
<td style="vertical-align:top;"><span style="color:#808080; font-weight:bold;">$($line[0])</span><br>$($line[1])<br>$($line[2])<br>$($line[3])<br>$($line[4])<br>$($line[5])</td>
<td style="vertical-align:top;"><span style="color:#808080; font-weight:bold;">$company</span><br>$address<br>$location<br></td>
</tr>
<tr style="font-size:6pt;">
<td style="vertical-align:top;">&nbsp;</td>
<td style="vertical-align:top;">&nbsp;</td>
</tr>
<tr>
<td style="vertical-align:top; font-size:6pt;">$group1<span style="font-weight:bold;">$group2</span><br><span style="font-size:5pt;">$rootCert1<a href="$rootCertURL">$rootCert2</a>$rootCert3<br>$rootCert4</span></td>
<td style="vertical-align:top;"><img style="width:99px; height:23px; border:0;" alt="$company" src="$logoHTML"></td>
</tr>
</table>
</p>
</body>
</html>
"@

Set-Content -Path $htmFile -Value $htmlContent

$txtContent = @"
$($line[0] -replace $separator, "  |  ")
$($line[1])
$($line[2])
$($line[3])
$($line[4] -replace $separator, "  |  ")
$($line[5])

$company
$address
$location

$group1$group2
"@

Set-Content -Path $txtFile -Value $txtContent

$rtfContent = @"
{\rtf1\fbidis\ansi\ansicpg1252\deff0\deflang2055{\fonttbl{\f0\fswiss\fprq2\fcharset0 Arial;}}
{\colortbl ;\red0\green0\blue255;\red0\green0\blue0;\red128\green128\blue128;}
\viewkind4\uc1\pard\ltrpar\lang1033\f0\fs15
\trowd\cellx3800\cellx7200
\pard\intbl\cf3\b $($line[0] -replace $separator, " | ")\b0\cf2\line $($line[1])\line $($line[2])\line $($line[3])\line $($line[4] -replace $separator, " | ")\line $($line[5])\cell
\pard\intbl\cf3\b $company\b0\cf2\line $address\line $location\cell
\row
\trowd\cellx3800\cellx7200
\pard\intbl \cell
\pard\intbl \cell
\row
\trowd\cellx3800\cellx7200
\pard\intbl\fs12$group1\b $group2\b0\line
\fs10 $rootCert1{\field{\*\fldinst{HYPERLINK "$rootCertURL"}}{\fldrslt{\ul\cf1 $rootCert2 }}}\f0$rootCert3\line
$rootCert4\cell
\pard\intbl{\pict{\*\picprop}\wmetafile8\picw2619\pich609\picwgoal1485\pichgoal345
$(
    $base64logo = [Convert]::ToBase64String((Get-Content -Path ".\logo.png" -Encoding Byte))
    $rtfLogo = $base64logo -replace ".{67}", "$&`n"
)
}\cell
\row
}
"@

Set-Content -Path $rtfFile -Value $rtfContent

if ($ostName) {
    Copy-Item -Path $htmFile -Destination $htmFileOST
    Copy-Item -Path $rtfFile -Destination $rtfFileOST
    Copy-Item -Path $txtFile -Destination $txtFileOST
}

$outlookApp = New-Object -ComObject Outlook.Application
$emailOptions = $outlookApp.EmailOptions
$sigObject = $emailOptions.EmailSignature

$sigObject.NewMessageSignature = $sigName
$sigObject.ReplyMessageSignature = $sigName

$outlookApp.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($outlookApp) | Out-Null
```