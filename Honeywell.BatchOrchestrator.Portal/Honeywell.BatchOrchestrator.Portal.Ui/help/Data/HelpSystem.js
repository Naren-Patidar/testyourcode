var xmlHelpSystemData = '';
xmlHelpSystemData += '<?xml version="1.0" encoding="utf-8"?>';
xmlHelpSystemData +=
  '<WebHelpSystem DefaultUrl="Content/Batch_orchs/About This Guide.htm" Toc="Data/Tocs/batch_orchs.js" Index="Data/Index.js" Concepts="Data/Concepts.js" Glossary="Data/Glossary.js" SearchDatabase="Data/Search.js" Alias="Data/Alias.xml" Synonyms="Data/Synonyms.xml" SearchFilterSet="Data/Filters.js" PathToScriptsFolder="Resources/Scripts/" SkinName="HTML5 - Tripane" SkinID="HTML5_TriPane" Multilingual="false" Skins="HTML5 - Tripane" BuildTime="9/29/2020 4:04:13 PM" BuildVersion="13.2.6355.27565" TargetType="WebHelp2" SkinTemplateFolder="Skin/" InPreviewMode="false" TopNavTocPath="true" MoveOutputContentToRoot="false" ReplaceReservedCharacters="false" MakeFileLowerCase="false" UseCustomTopicFileExtension="false" PreventExternalUrls="false" EnableResponsiveOutput="true" IncludeGlossarySearchResults="true" ResultsPerPage="20" xml:lang="en-us" LanguageName="English" SearchEngine="MadCapSearch">';
xmlHelpSystemData +=
  '    <CatapultSkin Version="3" SkinType="WebHelp2" Comment="HTML5 skin" Anchors="Width,Height" Width="800" Height="600" Top="0" Left="0" Bottom="0" Right="0" Tabs="TOC" DefaultTab="TOC" UseBrowserDefaultSize="True" UseDefaultBrowserSetup="true" RemoveImagesOnSave="true" EnableResponsiveOutput="true" CommentsInTopic="false" DisplayCommunitySearchResults="false" DisplayNotificationOptions="false" Title="[%=Prod_Rel.Product%] R[%=Prod_Rel.RelShort%] User Assistance" AutoSyncTOC="true" BrowserSetup="" SkinID="HTML5_TriPane" NavigationLinkTop="false" IndexPartialWordSearch="false" GlossaryPartialWordSearch="false" Name="HTML5 - Tripane" SkinClass="_Skins_HTML5___Tripane" HideNavOnStartup="False" LogoUrl="">';
xmlHelpSystemData +=
  '        <Toolbar EnableCustomLayout="true" Buttons="Print|Separator|PreviousTopic|NextTopic">';
xmlHelpSystemData += '            <Script>$(document).ready(function(){';
xmlHelpSystemData +=
  '	var headerTitle = $("meta[name=\'header-title\']").attr("content");';
xmlHelpSystemData += '';
xmlHelpSystemData +=
  '	$("#header&gt;a").after(\'&lt;div id="header-title"&gt;&lt;/div&gt;\');';
xmlHelpSystemData += '	$("#header-title").text(headerTitle);';
xmlHelpSystemData += '	$("#header-title").css({';
xmlHelpSystemData += '	"font-family": "Honeywell Cond Web Extrabold",';
xmlHelpSystemData += '	"font-size": "2em",';
xmlHelpSystemData += '	"padding-left": "290px",';
xmlHelpSystemData += '	"padding-top": "32px",';
xmlHelpSystemData += '	"color": "#ffffff"';
xmlHelpSystemData += '});';
xmlHelpSystemData += '';
xmlHelpSystemData +=
  '	$("#responsiveHeader&gt;a").after(\'&lt;div id="responsive-header-title"&gt;&lt;/div&gt;\');';
xmlHelpSystemData += '	$("#responsive-header-title").text(headerTitle);';
xmlHelpSystemData += '';
xmlHelpSystemData += '});</Script>';
xmlHelpSystemData += '        </Toolbar>';
xmlHelpSystemData +=
  '        <WebHelpOptions NavigationPaneWidth="275" NavigationPanePosition="Left" HideNavigationOnStartup="false" />';
xmlHelpSystemData += '    </CatapultSkin>';
xmlHelpSystemData += '</WebHelpSystem>';
MadCap.Utilities.Xhr._FilePathToXmlStringMap.Add(
  'HelpSystem',
  xmlHelpSystemData
);
