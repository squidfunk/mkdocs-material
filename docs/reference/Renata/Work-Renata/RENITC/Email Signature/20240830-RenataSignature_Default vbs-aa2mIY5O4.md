# RenataSignature_Default vbs

'--------------------------------------------------------------------------------
' RenataSignature_Default.vbs
'--------------------------------------------------------------------------------
' Author: Beat Schneider
' Createt: 06.10.2022
' Version: 2.2
'--------------------------------------------------------------------------------
' Creates a Outlook Mail Signature depending on information from Active Directory
' based on <http://www.howto-outlook.com/howto/corporatesignatures.htm>
'--------------------------------------------------------------------------------
' Image code for HTML: <https://www.base64-image.de/>
' Image code for RTF with Outlook signature editor
'--------------------------------------------------------------------------------

Option Explicit
On Error Resume Next

Dim strSigName, strGeneralPhone, strGroup1, strGroup2, strRootCert1, strRootCert2, strRootCert3, strRootCert4, strRootCertURL, strLogoHTML
Dim strName, strGivenName, strTitle, strCompany, strAddress, strPostalCode, strCity, strCountry, strMail, strWebpage, strPhone, strMobile, strInfo, strPager, strForeignPhone
Dim strBannerPic, strBannerWidth, strBannerHeight, strBannerURL
Dim strSigFolder, strHTMFile, strRTFFile, strTXTFile, strHTMFileOST, strRTFFileOST, strTXTFileOST
Dim strFullName, strTextPhone, strTextPhoneDE, strTextPhoneFR, strTextPhoneIT, strTextDirect, strTextMobile, strSeparator, strLocation
Dim strZeile(5)
Dim iRow, iRow2

Dim boolUpdateStyle

'================================================================================
' Some Script Variables
'================================================================================
strSigName			= "Renata SA"
strGeneralPhone		= "+41 61 975 7575"
strGroup1			= "A company of "
strGroup2			= "The SWATCH GROUP"
strRootCert1		= "If you cannot verify the digital signature, please click "
strRootCert2		= "here"
strRootCert3		= " to download"
strRootCert4		= "the root certificate."
strRootCertURL		= "<http://pki.swatchgroup.com/cert/SGRCHGR046_Swatch> Group Root CA.crt"
strSeparator		= "&ensp;|&ensp;"
strTextPhone		= "Phone: "
strTextPhoneDE		= "Phone DE: "
strTextPhoneFR		= "Phone FR: "
strTextPhoneIT		= "Phone IT: "
strTextDirect		= "Direct: "
strTextMobile		= "Mobile: "

strLogoHTML			= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAAAXCAYAAAAfiPFCAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5AIUDSYBWLtAfQAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1wggg=="

strBannerWidth		= "0"
strBannerHeight		= "0"
strBannerURL		= "<http://www.xxx.com>"
strBannerPic		= ""

'If signature exists, overwrite (true) or leave alone (false)?
boolUpdateStyle = true

'================================================================================
' Read User's Active Directory Information
'================================================================================
Dim objSysInfo, objUser

Set objSysInfo = CreateObject("ADSystemInfo")
Set objUser    = GetObject("LDAP://" & objSysInfo.Username)

strName			= [objUser.sn](https://objUser.sn)
strGivenName	= objUser.givenName
strTitle		= Split(objUser.title," Ķ ")
strCompany		= objUser.Company
strAddress		= objUser.streetAddress
strPostalCode	= objUser.postalCode
strCity			= objUser.l
strCountry		= [objUser.co](https://objUser.co)
strMail			= objUser.mail
strWebpage		= objUser.wWWHomePage
strPhone		= objUser.telephoneNumber
strMobile		= [objUser.mobile](https://objUser.mobile)
strInfo			= [objUser.info](https://objUser.info)
strPager		= objUser.pager

Set objUser    = Nothing
Set objSysInfo = Nothing

'================================================================================
' Create Folder and File Objects
'================================================================================
Dim objShell, objFSO, objFile
Dim strPath, strOSTName

Set objShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

'================================================================================
' Get Signature Folder
'================================================================================
strSigFolder = ObjShell.ExpandEnvironmentStrings("%appdata%") & "\Microsoft\Signatures\"

If Not (objFSO.FolderExists(strSigFolder)) Then	Call objFSO.CreateFolder(strSigFolder)

'================================================================================
' Get OST Name
'================================================================================
strPath=ObjShell.ExpandEnvironmentStrings("%localappdata%") & "\Microsoft\Outlook\"

For Each objFile In objFSO.GetFolder(strPath).Files
    If LCase(objFSO.GetExtensionName(objFile.Name)) = "ost" Then
		strOSTName = objFSO.GetBaseName(objFile.Name)
        Exit For
    End If         
Next

'================================================================================
' Get Signature Files
'================================================================================
strHTMFile = strSigFolder & strSigName & ".htm"
strRTFFile = strSigFolder & strSigName & ".rtf"
strTXTFile = strSigFolder & strSigName & ".txt"

If Len(strOSTName) > 0 Then
	strHTMFileOST = strSigFolder & strSigName & " (" & strOSTName & ").htm"
	strRTFFileOST = strSigFolder & strSigName & " (" & strOSTName & ").rtf"
	strTXTFileOST = strSigFolder & strSigName & " (" & strOSTName & ").txt"
End If

'================================================================================
' Delete Existing Signature "Renata SA"
'================================================================================
If objFSO.FileExists(strHTMFile) Then Call objFSO.DeleteFile(strHTMFile, True)
If objFSO.FileExists(strRTFFile) Then Call objFSO.DeleteFile(strRTFFile, True)
If objFSO.FileExists(strTXTFile) Then Call objFSO.DeleteFile(strTXTFile, True)

If Len(strOSTName) > 0 Then
	If objFSO.FileExists(strHTMFileOST) Then Call objFSO.DeleteFile(strHTMFileOST, True)
	If objFSO.FileExists(strRTFFileOST) Then Call objFSO.DeleteFile(strRTFFileOST, True)
	If objFSO.FileExists(strTXTFileOST) Then Call objFSO.DeleteFile(strTXTFileOST, True)
End If

'================================================================================
' Prepare Content
'================================================================================
strFullName	= strName
If Trim(strGivenName) <> "" Then StrFullName  = strGivenName & " " & strFullName
If Trim(strInfo) <> "" Then strFullName = strFullName & ", " & strInfo

iRow = 0
strZeile(iRow) = strFullName
If Trim(strTitle(0)) <> "" Then strZeile(iRow) = strZeile(iRow) & strSeparator & strTitle(0)

iRow = iRow + 1
If UBound(strTitle) > 0 Then
	strZeile(iRow) = strTitle(1)
	iRow = iRow + 1
End If
If Trim(strPager) <> "" Then
	Select Case Left(strPager, 3)
		Case "+49" 'DE
			strForeignPhone = strTextPhoneDE
		Case "+33" 'FR
			strForeignPhone = strTextPhoneFR
		Case "+39" 'IT
			strForeignPhone = strTextPhoneIT
		Case Else
			strForeignPhone = strTextPhone
	End Select
	strZeile(iRow) = strForeignPhone & strPager
	iRow = iRow + 1
End If
strZeile(iRow) = strTextPhone & strGeneralPhone

iRow = iRow + 1
If strPhone <> strGeneralPhone Then strZeile(iRow) = strTextDirect & strPhone
If Trim(strMobile) <> "" Then 
	strZeile(iRow) = strZeile(iRow) & strSeparator & strTextMobile & strMobile
	iRow2 = iRow
End If

If	Trim(strZeile(iRow)) = "" Then iRow = iRow - 1

iRow = iRow + 1
strZeile(iRow) = strMail

strLocation = strPostalCode & " " & strCity & ", " & strCountry

'================================================================================
' Create HTM File
'================================================================================
Err.Clear

Set objFile = objFSO.CreateTextFile(strHTMFile, boolUpdateStyle, False)
If Err.Number = 0 Then
	objFile.Write "<html><head><meta http-equiv=""content-type"" content=""text/html; charset=ISO-8859-1""><title></title></head><body>" & vbCrLf
	objFile.Write "<p>" & vbCrLf
	objFile.Write "<table style=""width:400px; border-collapse:collapse; border:none; color:#000000; font-family:Arial; font-size:7.5pt;"">" & vbCrLf

'	Zelle 1 & 2
	objFile.Write "<tr>" & vbCrLf
	objFile.Write "<td style=""vertical-align:top;""><span style=""color:#808080; font-weight:bold;"">" &  strZeile(0) & "</span><br />" & strZeile(1) & "<br />" & strZeile(2)
	If Trim(strZeile(3)) <> "" Then objFile.Write "<br />" & strZeile(3)
	If Trim(strZeile(4)) <> "" Then objFile.Write "<br />" & strZeile(4)
	If Trim(strZeile(5)) <> "" Then objFile.Write "<br />" & strZeile(5)
	objFile.Write "</td>" & vbCrLf

	objFile.Write "<td style=""vertical-align:top;""><span style=""color:#808080; font-weight:bold;"">" &  strCompany & "</span><br />" & strAddress & "<br />" & strLocation & "<br />" & strWebpage & "</td>" & vbCrLf
	objFile.Write "</tr>" & vbCrLf

'	Zelle 3 & 4
	objFile.Write "<tr style=""font-size:6pt;"">" & vbCrLf
	objFile.Write "<td style=""vertical-align:top;"">&nbsp;</td>" & vbCrLf
	objFile.Write "<td style=""vertical-align:top;"">&nbsp;</td>" & vbCrLf
	objFile.Write "</tr>" & vbCrLf

'	Zelle 5 & 6
	objFile.Write "<tr>" & vbCrLf
	objFile.Write "<td style=""vertical-align:top; font-size:6pt;"">" & strGroup1 & "<span style=""font-weight:bold;"">" & strGroup2 & "</span><br /><span style=""font-size:5pt;"">" &strRootCert1 & "<a href=""" & strRootCertURL & """>" & strRootCert2 & "</a>" & strRootCert3 & "<br />" & strRootCert4 & "</span></td>" & vbCrLf
	objFile.Write "<td style=""vertical-align:top;""><img style=""width:99px; height:23px; border:0;"" alt=""" & strCompany & """ src=""" & strLogoHTML & """></td>" & vbCrLf
	objFile.Write "</tr>" & vbCrLf
	objFile.Write "</table></p>" & vbCrLf

'AD banner
'---------
'	objFile.Write "<p>" & vbCrLf
'	objFile.Write "<table style=""width:400px; border-collapse:collapse; border:none; color:#000000; font-family:Arial; font-size:7.5pt;"">" & vbCrLf
'	objFile.Write "<tr>" & vbCrLf
'	objFile.Write "<td colspan=""2"" style=""vertical-align:top;""><br /><a href=""" & strBannerURL & """><img style=""width:" & strBannerWidth & "px; height:" & strBannerHeight & "px; border:0;"" alt=""" & strCompany & """ src=""" & strBannerPic & """><a></td>" & vbCrLf
'	objFile.Write "</tr>" & vbCrLf
'	objFile.Write "</table></p>" & vbCrLf

	objFile.Write "</body></html>" & vbCrLf
	objFile.Close
End If

'================================================================================
' Create TXT File
'================================================================================
Err.Clear

strZeile(0) = Replace(strZeile(0), "&ensp;|&ensp;", "  |  ")
strZeile(iRow2) = Replace(strZeile(iRow2), "&ensp;|&ensp;", "  |  ")

Set objFile = objFSO.CreateTextFile(strTXTFile, boolUpdateStyle, False)
If Err.Number = 0 Then
	objFile.Write strZeile(0) & vbCrLf
	objFile.Write strZeile(1) & vbCrLf
	objFile.Write strZeile(2) & vbCrLf
	If Trim(strZeile(3)) <> "" Then objFile.Write strZeile(3) & vbCrLf
	If Trim(strZeile(4)) <> "" Then objFile.Write strZeile(4) & vbCrLf
	If Trim(strZeile(5)) <> "" Then objFile.Write strZeile(5) & vbCrLf
	objFile.Write vbCrLf
	objFile.Write strCompany & vbCrLf
	objFile.Write strAddress & vbCrLf
	objFile.Write strLocation & vbCrLf
	objFile.Write strWebpage & vbCrLf
	objFile.Write vbCrLf
	objFile.Write strGroup1 & strGroup2 & vbCrLf
	objFile.Close
End If

'================================================================================
' Create RTF File
'================================================================================
Err.Clear

strZeile(0) = Replace(strZeile(0), "   |   ", " | ")
strZeile(iRow2) = Replace(strZeile(iRow2), "   |   ", " | ")

Set objFile = objFSO.CreateTextFile(strRTFFile, boolUpdateStyle, False)
If Err.Number = 0 Then
	objFile.Write "{\rtf1\fbidis\ansi\ansicpg1252\deff0\deflang2055{\fonttbl{\f0\fswiss\fprq2\fcharset0 Arial;}}" & vbCrLf
	objFile.Write "{\colortbl ;\red0\green0\blue255;\red0\green0\blue0;\red128\green128\blue128;}" & vbCrLf
	objFile.Write "\viewkind4\uc1\pard\ltrpar\lang1033\f0\fs15" & vbCrLf
	objFile.Write "\trowd\cellx3800\cellx7200" & vbCrLf
	objFile.Write "\pard\intbl\cf3\b " & strZeile(0) & "\b0\cf2\line " & strZeile(1) & "\line " & strZeile(2)
	If Trim(strZeile(3)) <> "" Then objFile.Write "\line " & strZeile(3)
	If Trim(strZeile(4)) <> "" Then objFile.Write "\line " & strZeile(4)
	If Trim(strZeile(5)) <> "" Then objFile.Write "\line " & strZeile(5)
	objFile.Write  "\cell" & vbCrLf
	objFile.Write "\pard\intbl\cf3\b " & strCompany & "\b0\cf2\line " & strAddress & "\line " & strLocation & "\line " & strWebpage & "\cell" & vbCrLf
	objFile.Write "\row" & vbCrLf
	objFile.Write "\trowd\cellx3800\cellx7200" & vbCrLf
	objFile.Write "\pard\intbl \cell" & vbCrLf
	objFile.Write "\pard\intbl \cell" & vbCrLf
	objFile.Write "\row" & vbCrLf
	objFile.Write "\trowd\cellx3800\cellx7200" & vbCrLf
	objFile.Write "\pard\intbl\fs12" & strGroup1 & "\b " & strGroup2 & "\b0\line" & vbCrLf
	objFile.Write "\fs10 " & strRootCert1 & "{\field{\*\fldinst{HYPERLINK """ & strRootCertURL & """}}{\fldrslt{\ul\cf1 " & strRootCert2 & " }}}\f0" & strRootCert3 & "\line" & vbCrLf
	objFile.Write strRootCert4 & "\cell" & vbCrLf
	objFile.Write "\pard\intbl{\pict{\*\picprop}\wmetafile8\picw2619\pich609\picwgoal1485\pichgoal345" & vbCrLf
	objFile.Write "010009000003c40d000000009b0d000000000400000003010800050000000b0200000000050000" & vbCrLf
	objFile.Write "000c0217006300030000001e00040000000701040004000000070104009b0d0000410b2000cc00" & vbCrLf
	objFile.Write "170063000000000017006300000000002800000063000000170000000100180000000000f41a00" & vbCrLf
	objFile.Write "0000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffd6d6d6bdbdb5bdbdb59c9c9c9c9c949c9c9c9c9c94b5b5adf7f7efff" & vbCrLf
	objFile.Write "fffff7efefadada59c9c8ca59c949c9c94a59c9ca5a59cadada5c6c6c6ffffffffffffefefe7a5" & vbCrLf
	objFile.Write "a59c9c9c949c9c94a5a59ce7e7e7ffffffffffffcecece9c9c949c9c9c9c9c94bdbdb5fffff7ff" & vbCrLf
	objFile.Write "ffffc6c6c69c9c949c9c949ca5949c9c949ca594b5b5adefefefffffffd6d6ceb5b5b5ffffffff" & vbCrLf
	objFile.Write "fffffffffffffffffffffffffffff7f7efadada5f7fff7ffffffefefefa5ad9c9c9c949c9c949c" & vbCrLf
	objFile.Write "9c949c9c94a5a59ccececeffffffffffffcecec69c9c949c9c949c9c94a5a5949c9c94a5a59cde" & vbCrLf
	objFile.Write "dede000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd6" & vbCrLf
	objFile.Write "d6d68c8c8cd6d6d6f7f7f7fffffff7f7f7fffff7bdbdb5b5b5adffffffc6c6bdadada5fffff7ff" & vbCrLf
	objFile.Write "fff7fffffffffff7f7f7f7adada5c6bdbdffffffffffffa5a5a5bdbdb5fffff7ffffffcecec6ad" & vbCrLf
	objFile.Write "adadffffffefefef94948ce7e7e7fffffffffff7adada5dededededede9c9c94e7e7e7ffffffff" & vbCrLf
	objFile.Write "fff7fffff7f7f7f7bdbdb5adadadffffffcecec6adb5adffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffefefefa5a59cf7f7f7ffffffa5a59cc6c6bdf7f7f7fffffffffff7ffffffe7e7de9c9c94e7" & vbCrLf
	objFile.Write "e7e7f7efef949494efefefffffffffffffffffffffffffdeded69c9c94000000ffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffcececea5ada5ffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffefefe79c9c9cffffffb5b5b5b5b5b5ffffffffffffffffffffffffffffffbd" & vbCrLf
	objFile.Write "b5adbdb5b5ffffffffffffa59c9cdededeffffffffffffefefefa5a5a5ffffffdededea5a59cff" & vbCrLf
	objFile.Write "ffffffffffffffffc6c6bdd6d6cec6c6bdbdbdb5ffffffffffffffffffffffffffffffffffffef" & vbCrLf
	objFile.Write "efefffffffcececeadada5ffffffffffffffffffffffffffffffffffffefefef9c9c9cfffff7f7" & vbCrLf
	objFile.Write "f7f79c9c94f7f7effffffffffffffffffffffffffffffff7f7effffff7f7efefdededeffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffdedede948c84000000ffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffd6d6d6a5ada5ffffffffffffffffffffffffffffffe7e7e7a5" & vbCrLf
	objFile.Write "a5a5ffffffe7e7e79c9c9cadadadb5b5b5b5b5b5b5b5adb5b5ada59c94c6c6bdffffffffffffa5" & vbCrLf
	objFile.Write "9c9ce7e7e7fffffffffffffffffff7f7f7ffffffe7e7e7a5a59cfffffffffffffffffff7f7f7ff" & vbCrLf
	objFile.Write "ffffc6c6bda5a59cb5b5b5b5b5b5b5b5adb5bdb5b5b5adb5b5b5c6c6c6ffffffcececeadb5adff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffefefefffffffefefefa5a59cf7fff7fffff79c9c94b5b5adb5b5adbd" & vbCrLf
	objFile.Write "b5b5b5b5b5b5b5b5b5b5b5bdbdbdefefe7ffffffcececea5ada5adada5adada5adada5adada5a5" & vbCrLf
	objFile.Write "a5a5ded6d6000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffcecec6adada5ffffffffffffffffffffffffffffffefefe79c9c94fffff7fffff7efefe7e7" & vbCrLf
	objFile.Write "e7dee7e7dedededee7e7def7f7efc6c6c6b5b5b5ffffffffffffa5a59ce7e7deffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffe7dedea5a59cffffffffffffffffffffffffffffffbdbdbdadada5e7e7e7de" & vbCrLf
	objFile.Write "dedee7e7dedededee7e7e7bdbdbda5a5a5ffffffcececea5a5a5ffffffffffffffffffffffffb5" & vbCrLf
	objFile.Write "bdb5cecec6f7f7f79c9c9cfffff7f7f7ef9c9c9cd6d6cee7e7e7dededee7e7dedededee7e7de94" & vbCrLf
	objFile.Write "9494dededef7f7f79c9c94dededef7f7f7eff7eff7f7f7f7f7f7fffff7f7f7f7000000ffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd6d6ce949484deded6ff" & vbCrLf
	objFile.Write "fff7fffffffffff7f7f7f7adb5adadada5ffffffe7e7e79c9c9cf7f7effffffffffffffffffff7" & vbCrLf
	objFile.Write "f7f79c9c9ccecec6fffffff7f7ef9c9c94deded6f7f7f7f7f7f7f7f7f7ffffffffffffdeded69c" & vbCrLf
	objFile.Write "9c9cf7f7f7f7f7f7f7f7f7f7f7efffffffd6d6d69c9c9cefefeffffffffffffffffffff7f7efad" & vbCrLf
	objFile.Write "adadbdbdbdffffffcecece8c8c8cd6ded6fffffffffff7eff7ef949c94dededef7f7efa5a59cf7" & vbCrLf
	objFile.Write "f7f7ffffffa5a59ccecec6ffffffffffffffffffffffffd6d6d69c9c9cf7f7f7f7f7f7949494e7" & vbCrLf
	objFile.Write "e7e7ffffffffffffffffffffffffbdbdbdbdbdbd000000ffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffced6cea5a594b5b5adadada5adada5adada5a5a59cad" & vbCrLf
	objFile.Write "adadefefefffffffffffffbdbdbda5a59cadadadadada5adadada5a59cbdbdbdffffffe7e7e7a5" & vbCrLf
	objFile.Write "a59c9c9c94a5a59cadada5a5a5a5a5a5a5cecec6cecece9c9c949c9c94a5a59cadada5a5a5a5ad" & vbCrLf
	objFile.Write "ada5efefefffffffc6c6bda5a5a5a5a5a5adadada5a5a5a5a5a5b5b5b5ffffffffffffdeded6ad" & vbCrLf
	objFile.Write "adadbdbdbda5a5a5adadad9c9c9cbdbdb5fffffff7f7f7adada5f7f7f7ffffffefefe7a5a5a5a5" & vbCrLf
	objFile.Write "a5a5a5ada5adadada5a59ca5a5a5deded6ffffffffffffcececea5a5a5adadadadada5adadada5" & vbCrLf
	objFile.Write "ada5a5ada5dedede000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffd6d6ceadada5fffffff7f7f7f7f7f7f7f7efffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "fffffffffff7f7f7f7f7f7f7f7f7fffffffffffffffffffffffffffff79c9c94deded6ffffffff" & vbCrLf
	objFile.Write "fffffffff7ffffffffffffdeded69c9c94fffff7ffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "fffff7f7f7f7f7f7f7f7f7fffffffffffffffffffffffffffffffffffffffffffffff7f7f7f7ff" & vbCrLf
	objFile.Write "fffffffffffffffffffffffffffffffffffffffffffffffffffff7f7f7f7f7f7f7f7f7fffff7ff" & vbCrLf
	objFile.Write "fffffffffffffffffffffffffffffffffff7f7f7f7f7f7f7f7effffff7ffffffffffff000000ff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcecec6a5a59cff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffcececef7f7efffffffffffffffffffffffffffffffef" & vbCrLf
	objFile.Write "efefcececeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffff000000ffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffe7e7dec6c6bdffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffff000000ffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "fffffffffffffffffffffffffffff7ffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00" & vbCrLf
	objFile.Write "0000cec6c6c6c6bdc6c6bdefefefffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffd6d6d6c6c6bdbdb5b5bdbdb5bdbdb5bdbdb5bdbdb5cececeefefeffffffffffffff7efefc6" & vbCrLf
	objFile.Write "c6bdc6c6bdc6c6c6ffffffffffffffffffffffffffffffcececec6c6bdc6bdb5e7e7deffffffff" & vbCrLf
	objFile.Write "ffffdeded6c6c6bdbdb5b5bdbdbdbdbdb5bdbdb5c6c6c6efefefc6c6c6c6c6bdc6c6bdf7f7f7ff" & vbCrLf
	objFile.Write "ffffffffffffffffefefefc6c6c6bdbdbdbdbdb5bdbdb5c6c6bdefefefffffffffffffffffffe7" & vbCrLf
	objFile.Write "e7e7bdbdbdbdbdb5bdb5b5bdbdb5b5b5b5cecec6efefe7cececeb5bdc6c6c6bdf7f7efffffffef" & vbCrLf
	objFile.Write "f7ff9cc6efdef7ffb5d6ffdeeff7bdd6f7d6efffbdd6f7deefffb5d6f7deefffbdd6efefffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffff0000008c8c84948c8c8c8484de" & vbCrLf
	objFile.Write "dedeffffffffffffffffffffffffffffffffffffffffffffffffb5b5ad9494848c8c848c8c8484" & vbCrLf
	objFile.Write "847b8c8c7b8c847b948c8c8c8c849c9c94e7e7deffffffd6d6d68c8c848c8c849c9c94f7f7f7ff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffa5a5a58c8c848c8c84bdbdb5ffffffd6d6d68c948c8c8c84948c8c8c" & vbCrLf
	objFile.Write "8c848c8c7b84847b8c8c7b9c9c8c94948c8c8c8494948ce7e7e7ffffffffffffdedede94948c8c" & vbCrLf
	objFile.Write "8c8c8c8c848c8c848c8c8494948c8c8c8cd6d6ceffffffdee7de8c8c8494948c948c848c8c8484" & vbCrLf
	objFile.Write "847b8c8c7b84847b9c9c9494948c948c84948c84efe7e7ffffffeff7ffb5cededef7ff639ce7bd" & vbCrLf
	objFile.Write "deff63a5efb5deff73a5e7bddeff63a5efc6e7ff6ba5e7e7f7ffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffff0000009c9c949c948c94948cdededeffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffd6d6d6948c8c94948c9c9c94bdbdb5d6d6ced6cecececec6a5a59c94" & vbCrLf
	objFile.Write "948c84847bb5b5adffffffdedede94948c9c9c94a5a59cffffffffffffffffffffffffffffffad" & vbCrLf
	objFile.Write "ada594948c949484c6c6c6ffffffbdbdbd8c94849c9c8ca59c9cc6c6c6cececed6d6cec6c6bdad" & vbCrLf
	objFile.Write "ada594948c9c9c8c94948cf7f7efffffffffffffadada594948c94948c9c9c94a5a59ca5a59c94" & vbCrLf
	objFile.Write "9c8c94948c9ca59cffffffbdc6bd94948c94948ca5a59cc6c6bdd6d6cececec6cecec6adada59c" & vbCrLf
	objFile.Write "9c94949494949c8ce7efefffffffffffffc6efff7bade794c6ef9cd6ff73b5f7addeff7bb5f7ad" & vbCrLf
	objFile.Write "deff6bb5f7addeff6badfff7ffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffff00000094948c9c9c8c8c8c84dededeffffffffffffffffffffffffffffffffffffffffffbd" & vbCrLf
	objFile.Write "bdb58c8c8c94948cbdb5b5ffffffffffffffffffffffffefefe7c6c6bdc6c6bdd6d6ceffffffde" & vbCrLf
	objFile.Write "ded694948c94948ca5a59cf7f7f7ffffffffffffffffffffffffadadad948c84949484c6c6bdff" & vbCrLf
	objFile.Write "ffffb5b5b594948c8c8c84bdbdb5ffffffffffffffffffffffffe7e7e794949494948c9c9c94ef" & vbCrLf
	objFile.Write "efe7ffffffffffffa5a59c94948c94948cc6c6bdfffffff7f7ef9c9c94848c7b94948cf7f7efc6" & vbCrLf
	objFile.Write "c6bd8c8c8494948cb5b5adffffffffffffffffffffffffefefef94948c9c949494948cefefefff" & vbCrLf
	objFile.Write "ffffeff7ff63ade78cc6f7b5e7ff63a5efc6deef7bb5f79ccef794c6f794c6ef94ceff84bdf7ff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000009c9c8c9c9c8c94" & vbCrLf
	objFile.Write "948cdededeffffffffffffffffffffffffffffffffffffffffffadb5ad94948c94948cadad9cb5" & vbCrLf
	objFile.Write "b5adbdbdb5b5b5b5bdbdb5bdbdb5c6c6bdbdbdb5d6d6ceffffffe7e7de94948c9c9c8ca5a59cff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffadada594948c949484cecec6ffffffc6c6bd8c8c849c9c8c9c" & vbCrLf
	objFile.Write "9c94bdbdb5bdbdbdc6c6bdbdc6bdadada594948c9c9c8c94948cefefefffffffffffffa5a59c9c" & vbCrLf
	objFile.Write "9c948c8c84d6d6d6ffffffffffffcececec6c6bdc6c6c6ffffffc6c6c68c8c8494948c9c9c94b5" & vbCrLf
	objFile.Write "b5adc6c6bdbdbdb5c6c6bdadada59c9c949c9c8c949c8cdeefefffffffffffffbde7ff9ccef763" & vbCrLf
	objFile.Write "a5efadd6f7b5deff6ba5e7bdefff63a5efc6e7ff73adefbde7ffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffff0000009494849c9c8c8c8c84dededefffffffffffff7" & vbCrLf
	objFile.Write "f7f7c6c6bdb5b5b5cececeffffffb5b5ad9494849c9c8c9494848c8c7b84847b8c8c848c848494" & vbCrLf
	objFile.Write "8c848c8c848c8c84adada5ffffffdeded694948c94948c9c9c94f7f7efffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffadada5949484949484c6c6bdffffffefefefadada594948c94948c8c8c848c8c8484847b8c" & vbCrLf
	objFile.Write "8c849c9c949c9c8c949484949c8cefefe7fffffffffff7a5a59c94948c94948ccececeffffffff" & vbCrLf
	objFile.Write "fffffffffffffffffffffffffffff7f7f7ada5a59c949494948c8c8c8484847b8c8c848c8c84a5" & vbCrLf
	objFile.Write "a59494948c9c949494948cefefefffffffeff7ff7bade784b5f7bde7ffa5d6ff529cefc6efff84" & vbCrLf
	objFile.Write "b5ef7bbdf7addef76badefefffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffff0000009c9c8c9c9c8c94948cb5b5adfffff7ffffffdeded68c8c84948c84a5a59cff" & vbCrLf
	objFile.Write "ffffbdbdad94948c949484b5b5addeded6dededededed6dededeb5b5ad94948c949484bdbdb5ff" & vbCrLf
	objFile.Write "ffffe7dede94948c9c9c9494948cc6c6bdf7f7f7ffffffffffffe7e7e79c9c949c9c94949484ce" & vbCrLf
	objFile.Write "cec6ffffffffffffefefefdeded6d6d6cee7e7dee7dedeefe7e7efefefe7e7de9494949c949494" & vbCrLf
	objFile.Write "948ceff7efffffffffffffa5a59c9c9c8c8c9484ced6ceffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "fffffffffff7f7efd6d6ced6d6cee7e7dee7e7dee7e7def7f7efe7e7de9c9c9494948c9c9c94ef" & vbCrLf
	objFile.Write "efeffffffff7f7ffbdefffa5d6ff7bb5f773a5e7bde7ff8cc6ff6ba5efc6efff6bade7b5def7ff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000094948c9c" & vbCrLf
	objFile.Write "9c8c94948c94948c9c9c94ada5a59c948c9c9c8c948c84b5b5adffffffcecec68c8c849c9c8ca5" & vbCrLf
	objFile.Write "a59cdeded6e7e7dee7e7e7ded6d6ada59c94948c948c84c6bdbdffffffdeded694948c94948c9c" & vbCrLf
	objFile.Write "9c8c948c84a5a594ada59cada59c94948c9c9c8c94948c949484deded6ffffffdedede9c9c94a5" & vbCrLf
	objFile.Write "a59cadada5d6d6cee7e7e7e7e7dee7e7deb5b5ad94948c94948c9c9c94f7fff7d6d6cea5a59c9c" & vbCrLf
	objFile.Write "9c9494948c9c9c8ca5a59cb5adadada5a5adada5a5a59ccececeffffffe7e7de9c9c94a5a59ca5" & vbCrLf
	objFile.Write "a59cd6d6cee7e7dee7e7dedededebdbdb594948c949c8c9c9c8cf7f7efffffffe7f7ff6bb5e77b" & vbCrLf
	objFile.Write "b5f79cceffd6efff84b5ef6ba5efceefff7bb5ef8cb5e7fffffff7ffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffff00000094948c8c94849c9c94b5b5ad94948c8c" & vbCrLf
	objFile.Write "8c8494948c94948494948cd6d6d6fffffff7eff7a5a59c8c8c8494948c8c8c849494848c8c848c" & vbCrLf
	objFile.Write "8c848c8c8c94948c9c9c9cf7f7efffffffdeded68c8c849494849c9c94adada58c8c848c94848c" & vbCrLf
	objFile.Write "948494948c94948c8c8c84adadadfffffffffffff7f7ef94948c8c94848c94848c94848c8c848c" & vbCrLf
	objFile.Write "94848c8c8494948c94948c8c948cbdc6bdffffffbdbdbd8c84849c948c9c9c8c9c9c8c94948c8c" & vbCrLf
	objFile.Write "8c84948c8c8c8c848c847bbdb5b5fffffff7f7f79c9c948c8c8494948c8c8c848c94848c8c848c" & vbCrLf
	objFile.Write "8c848c8c8494948c8c8c84c6bdb5fffffffffffff7ffffbde7ffadd6ff8cc6f7639cef8cbdf7d6" & vbCrLf
	objFile.Write "efff84bdf76badf7efffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffff000000b5b5adb5b5b5b5bdb5f7f7efcececeadadada5a59cadadadcececeff" & vbCrLf
	objFile.Write "ffffffffffffffffefefefbdbdbdadada5adada5a5a59ca5ada5a5ada5b5b5adbdbdbdf7f7f7ff" & vbCrLf
	objFile.Write "ffffffffffe7e7e7b5b5adb5b5adc6c6bdefefefcecec6adada5adada5a5a59cb5b5adcecec6ff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffe7e7e7b5b5adadada5a5ada5adada5a5a59ca5ada5a5a59cadb5adce" & vbCrLf
	objFile.Write "cec6ffffffffffffdededeadadad9c9c9494948c9c9c8cada59cbdbdb5b5b5b5bdbdb5b5ada5d6" & vbCrLf
	objFile.Write "d6ceffffffffffffe7e7e7bdbdb5adada5adada5a5a59cadada5a5a59cadada5adada5c6cecef7" & vbCrLf
	objFile.Write "ffffffffffffffffefefff6badef7badf79cc6efb5e7ffb5deff63a5ef6badf7effffffffffff7" & vbCrLf
	objFile.Write "fffffffff7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000ff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffa5a59494948c8c9484d6d6ceffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffce" & vbCrLf
	objFile.Write "efffc6def7a5ceff6badef6ba5efa5d6fff7fffffffffffffffff7ffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffff000000ffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "fffffffffffffffffffffffffffffffffffffffffffffffffffffffff7b5b5ada5a5949ca59cce" & vbCrLf
	objFile.Write "d6ceffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffffffffffffffffffffffffffffdef7ff5aa5e75aa5f773bdefbde7ffef" & vbCrLf
	objFile.Write "fffffffffffffffffffffffffffffffff7ffffffffffffffffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffff000000040000002701ffff030000000000" & vbCrLf
	objFile.Write "}\cell" & vbCrLf
	objFile.Write "\row" & vbCrLf
'with AD banner
'	objFile.Write "\trowd\cellx11000" & vbCrLf
'	objFile.Write "\line \line " & vbCrLf
'	objFile.Write "\pard\..." & vbCrLf	
'	objFile.Write "}}}\cell" & vbCrLf
'	objFile.Write "\row" & vbCrLf
	objFile.Write "}" & vbCrLf
	objFile.Close
End If

'================================================================================
' Copy signature file to OST version
'================================================================================

If Len(strOSTName) > 0 Then
	objFSO.CopyFile strHTMFile, strHTMFileOST
	objFSO.CopyFile strRTFFile, strRTFFileOST
	objFSO.CopyFile strTXTFile, strTXTFileOST
End If

'================================================================================
' Tidy-up
'================================================================================
set objFile		= Nothing
set objFSO		= Nothing
set objShell	= Nothing

'================================================================================
' Set Signature as Default
'================================================================================
Dim objWord, objEmailOptions, objSignatureObject

Set objWord				= CreateObject("Word.Application")
Set objEmailOptions		= objWord.EmailOptions
Set objSignatureObject	= objEmailOptions.EmailSignature

objSignatureObject.NewMessageSignature = strSigName
objSignatureObject.ReplyMessageSignature = strSigName

objWord.Quit

Set objSignatureObject	= Nothing
Set objEmailOptions		= Nothing
Set objWord				= Nothing
