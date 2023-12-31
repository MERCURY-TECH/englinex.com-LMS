export const EmailComfirmation = (link:string, header:string, body:string)=> `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1" name="viewport">
<meta name="x-apple-disable-message-reformatting">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="telephone=no" name="format-detection">
<title></title>
<!--[if (mso 16)]>
<style type="text/css">
a {text-decoration: none;}
</style>
<![endif]-->
<!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
<!--[if gte mso 9]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG></o:AllowPNG>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
<!--[if !mso]><!-- -->
<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
<!--<![endif]-->
</head>

<body>
<div class="es-wrapper-color">
<!--[if gte mso 9]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
        <v:fill type="tile" color="#ffffff"></v:fill>
    </v:background>
<![endif]-->
<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
        <tr>
            <td class="esd-email-paddings" valign="top">
                <table cellpadding="0" cellspacing="0" class="es-header esd-header-popover" align="center">
                    <tbody>
                        <tr>
                            <td class="esd-stripe" align="center">
                                <table bgcolor="#fad939" class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="510">
                                    <tbody>
                                        <tr>
                                            <td class="esd-structure es-p20r es-p20l" align="left">
                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                    <tbody>
                                                        <tr>
                                                            <td width="470" class="esd-container-frame" align="center" valign="top">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="center" class="esd-block-spacer" height="40"></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                        <tr>
                            <td class="esd-stripe" align="center">
                                <table class="es-content-body" style="background-color: transparent;" width="510" cellspacing="0" cellpadding="0" align="center" bgcolor="#FAD939">
                                    <tbody>
                                        <tr>
                                            <td class="esd-structure" align="left" esd-custom-block-id="839711">
                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="es-m-p0r esd-container-frame" width="510" valign="top" align="center">
                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="center" class="esd-block-banner" style="position: relative;" esdev-config="h1"><a target="_blank"><img class="adapt-img esdev-stretch-width esdev-banner-rendered" src="https://tlr.stripocdn.email/content/guids/bannerImgGuid/images/image16754305136317786.png" alt title width="510" style="display: block;"></a>
                                                                                <esd-stored-config-block style="display: none;">null</esd-stored-config-block>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                    <tbody>
                        <tr>
                            <td class="esd-stripe" align="center">
                                <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="510" style="border-radius: 0 0 50px 50px">
                                    <tbody>
                                        <tr>
                                            <td class="esd-structure es-p20r es-p20l" align="left" esd-custom-block-id="839713">
                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                    <tbody>
                                                        <tr>
                                                            <td width="470" class="esd-container-frame" align="center" valign="top">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="center" class="esd-block-text">
                                                                                <h1 style="color: #5d541d;">Please confirm<br>your email address</h1>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="center" class="esd-block-text es-p40t es-p40b">
                                                                                <h3>Thanks for joining Englinex.com!</h3>
                                                                                <p><br></p>
                                                                                <p>
                                                                                    ${body}
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="center" class="esd-block-button">
                                                                                <!--[if mso]><a href="https://viewstripo.email" target="_blank" hidden>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://viewstripo.email" 
        style="height:49px; v-text-anchor:middle; width:254px" arcsize="50%" stroke="f"  fillcolor="#8928c6">
<w:anchorlock></w:anchorlock>
<center style='color:#ffffff; font-family:Poppins, sans-serif; font-size:16px; font-weight:400; line-height:16px;  mso-text-raise:1px'>Confirm email address</center>
</v:roundrect></a>
<![endif]-->
                                                                                <!--[if !mso]><!-- --><span class="msohide es-button-border" style="background: #8928c6;"><a href="${link}" class="es-button" target="_blank" style="background: #8928c6; mso-border-alt: 10px solid  #8928c6">Confirm email address</a></span>
                                                                                <!--<![endif]-->
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="esd-structure es-p20t es-p40b es-p20r es-p20l" align="left" esd-custom-block-id="839715">
                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                    <tbody>
                                                        <tr>
                                                            <td width="470" align="left" class="esd-container-frame">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="center" class="esd-block-text">
                                                                                <p style="font-size: 14px;">Thanks,<br>Brandindoor Team!&nbsp;</p>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table cellpadding="0" cellspacing="0" class="es-header" align="center">
                    <tbody>
                        <tr>
                            <td class="esd-stripe" align="center">
                                <table bgcolor="#fad939" class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="510">
                                    <tbody>
                                        <tr>
                                            <td class="esd-structure es-p20r es-p20l" align="left">
                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                    <tbody>
                                                        <tr>
                                                            <td width="470" class="esd-container-frame" align="center" valign="top">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="center" class="esd-block-spacer" height="40"></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                    <tbody>
                        <tr>
                            <td class="esd-stripe" align="center">
                                <table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="510" style="border-radius: 50px">
                                    <tbody>
                                        <tr>
                                            <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left" esd-custom-block-id="839717">
                                                <!--[if mso]><table width="470" cellpadding="0" 
                cellspacing="0"><tr><td width="225" valign="top"><![endif]-->
                                                <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                    <tbody>
                                                        <tr>
                                                            <td width="225" class="es-m-p20b esd-container-frame" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="left" class="esd-block-image es-m-txt-c" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email"><img src="https://tlr.stripocdn.email/content/guids/CABINET_1bfc4ac6dddc4ae38edeae5cbef32bf9ff4e576d845736df126fd766dd798e9a/images/group_4076195_Ni6.png" alt="Logo" style="display: block;" height="30" title="Logo"></a></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!--[if mso]></td><td width="20"></td><td width="225" valign="top"><![endif]-->
                                                <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                    <tbody>
                                                        <tr>
                                                            <td width="225" align="left" class="esd-container-frame">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="right" class="esd-block-social es-p5t es-m-txt-c" style="font-size:0">
                                                                                <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" valign="top" class="es-p10r"><a target="_blank" href="https://viewstripo.email"><img src="https://tlr.stripocdn.email/content/assets/img/social-icons/circle-white/facebook-circle-white.png" alt="Fb" title="Facebook" height="24"></a></td>
                                                                                            <td align="center" valign="top" class="es-p10r"><a target="_blank" href="https://viewstripo.email"><img src="https://tlr.stripocdn.email/content/assets/img/social-icons/circle-white/twitter-circle-white.png" alt="Tw" title="Twitter" height="24"></a></td>
                                                                                            <td align="center" valign="top" class="es-p10r"><a target="_blank" href="https://viewstripo.email"><img src="https://tlr.stripocdn.email/content/assets/img/social-icons/circle-white/instagram-circle-white.png" alt="Ig" title="Instagram" height="24"></a></td>
                                                                                            <td align="center" valign="top"><a target="_blank" href="https://viewstripo.email"><img src="https://tlr.stripocdn.email/content/assets/img/social-icons/circle-white/youtube-circle-white.png" alt="Yt" title="Youtube" height="24"></a></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!--[if mso]></td></tr></table><![endif]-->
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                    <tbody>
                        <tr>
                            <td class="esd-stripe" align="center">
                                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="510" style="border-radius: 50px; background-color: transparent;">
                                    <tbody>
                                        <tr>
                                            <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                    <tbody>
                                                        <tr>
                                                            <td width="470" class="esd-container-frame" align="center" valign="top">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="center" class="esd-block-text es-infoblock">
                                                                                <p>Unsubscribe</p>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table cellpadding="0" cellspacing="0" class="es-header" align="center">
                    <tbody>
                        <tr>
                            <td class="esd-stripe" align="center">
                                <table bgcolor="#fad939" class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="510">
                                    <tbody>
                                        <tr>
                                            <td class="esd-structure es-p20r es-p20l" align="left">
                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                    <tbody>
                                                        <tr>
                                                            <td width="470" class="esd-container-frame" align="center" valign="top">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="center" class="esd-block-spacer" height="40"></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                    <tbody>
                        <tr>
                            <td class="esd-stripe" align="center">
                                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="510" style="background-color: transparent;">
                                    <tbody>
                                        <tr>
                                            <td class="esd-structure es-p20" align="left">
                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                    <tbody>
                                                        <tr>
                                                            <td width="470" class="esd-container-frame" align="center" valign="top">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="center" class="esd-block-image es-infoblock made_with" style="font-size:0"><a target="_blank" href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=confirm_email_2&utm_content=finish_registration"><img src="https://tlr.stripocdn.email/content/guids/CABINET_09023af45624943febfa123c229a060b/images/7911561025989373.png" alt width="125" style="display: block;"></a></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
</div>
</body>

</html>
`