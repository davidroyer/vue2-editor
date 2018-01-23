import Quill from 'quill'
var icons = Quill.import('ui/icons');
import fontawesome from '@fortawesome/fontawesome'

import {
  faBold,
  faItalic,
  faList,
  faListUl,
  faListOl,
  faTasks,
  faCode,
  faUnderline,
  faStrikethrough,
  faIndent,
  faOutdent,
  faLink,
  faQuoteLeft,

  faEraser,
  faImage,
  faVideo,

  faFont,
  faTint,
  faParagraph,
  faHeading,

  faSubscript,
  faSuperscript,

  faAlignLeft,
  faAlignRight,
  faAlignCenter,
  faAlignJustify
} from '@fortawesome/fontawesome-free-solid'

function svg(icon) {
  return fontawesome.icon(icon, {
    transform: { size: 23 },
    // classes: ['fa-fw']
  }).html[0]
}


icons['bold'] = svg(faBold);
icons['italic'] = svg(faItalic);
icons['underline'] = svg(faUnderline)
icons['strike'] = svg(faStrikethrough)

icons['blockquote'] = svg(faQuoteLeft)
icons['code-block'] = svg(faCode)

icons['list']['ordered'] = svg(faListOl)
icons['list']['bullet'] = svg(faListUl)
icons['list']['check'] = svg(faTasks)

icons['indent']['-1'] = svg(faOutdent)
icons['indent']['+1'] = svg(faIndent)

icons['align'][''] = svg(faAlignLeft)
icons['align']['right'] = svg(faAlignRight)
icons['align']['center'] = svg(faAlignCenter)
icons['align']['justify'] = svg(faAlignJustify)

icons['color'] = svg(faFont)
icons['background'] = svg(faTint)
icons['video'] = svg(faVideo)
icons['image'] = svg(faImage)
icons['link'] = svg(faLink)

icons['clean'] = svg(faEraser)

icons['script']['sub'] = svg(faSubscript);
icons['script']['super'] = svg(faSuperscript);

export default icons
