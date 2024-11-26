# RenataSignature_MDM_2024 vbs

'--------------------------------------------------------------------------------
' RenataSignature_MDM_2024.vbs
'--------------------------------------------------------------------------------
' Author: Beat Schneider
' Createt: 09.01.2024
' Version: 1.0
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

strLogoHTML			= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAAAXCAYAAAAfiPFCAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5AIUDSYBWLtAfQAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvmCC"
'use 144dpi pictures

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
	objFile.Write "<p>" & vbCrLf
	objFile.Write "<table style=""width:400px; border-collapse:collapse; border:none; color:#000000; font-family:Arial; font-size:7.5pt;"">" & vbCrLf
	objFile.Write "<tr>" & vbCrLf
	objFile.Write "<td colspan=""2"" style=""vertical-align:top;""><br /><a href=""" & strBannerURL & """><img style=""width:" & strBannerWidth & "px; height:" & strBannerHeight & "px; border:0;"" alt=""" & strCompany & """ src=""" & strBannerPic & """><a></td>" & vbCrLf
	objFile.Write "</tr>" & vbCrLf
	objFile.Write "</table></p>" & vbCrLf
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
	obffffffffffffffffffffffffffffff" & vbCrLf
	objFile.Write "ffffffffffffffffffffff000000040000002701ffff030000000000" & vbCrLf
	objFile.Write "}\cell" & vbCrLf
	objFile.Write "\row" & vbCrLf
'with AD banner
	objFile.Write "\trowd\cellx11000" & vbCrLf
	objFile.Write "\line \line " & vbCrLf
	objFile.Write "\pard\..." & vbCrLf	
	objFile.Write "\pard\sa200\sl240\slmult1\f0\fs22\lang7{\pict{\*\picprop}\wmetafile8\picw10495\pich2646\picwgoal5950\pichgoal1500 " & vbCrLf
	objFile.Write "0100090000031e0c02000000f50b020000000400000003010800050000000b0200000000050000" & vbCrLf
	fff7e7e7b573e7bd7befce94f7d6a5efce9cf7d6a5efc68cefc67bef" & vbCrLf
	objFile.Write "bd7bf7debdfffffffffffffff7e7fffffffffffff7debdefbd7befbd7befbd73efc67be7bd73ef" & vbCrLf
	objFile.Write "bd73e7bd73efbd73e7b573e7bd73e7b573e7bd73e7b56be7bd73e7bd7bfff7efffffffffefd6e7" & vbCrLf
	objFile.Write "b573e7bd73efce9cffffffffefe7e7bd73e7b573e7bd73ffffffffffffe7b573e7bd73e7b573e7" & vbCrLf
	objFile.Write "bd73e7b573fff7e7ffffffffffefe7b573efbd73e7bd73fff7e7ffffffefc68ce7bd73ffffffff" & vbCrLf
	ffffefffffe7ffffe7fff7e7ff" & vbCrLf
	ite "a552e7a552e7a552e7a55aefad63e7ad5ae7ad5ae7a55ae7ad5adea552e7a552de9c52dea552de" & vbCrLf
	objFile.Write "9c4adea552dea552e7ad5adea552dea552de9c52dea552dea54ae7ad5aefad63efb563e7ad5ae7" & vbCrLf
	objFile.Write "ad5ae7a552e7a552e7a552e7ad52e7a552efad5aefad5aefad5ae7ad5aefb563efad63efb56bef" & vbCrLf
	objFile.Write "b563efb56befb563efbd73000000040000002701ffff030000000000" & vbCrLf
	objFile.Write "}}}\cell" & vbCrLf
	objFile.Write "\row" & vbCrLf
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
