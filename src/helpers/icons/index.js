import Quill from 'quill'
var icons = Quill.import('ui/icons');

icons['bold'] =
  `<svg fill="#2d2d2d" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>
<path d="M0 0h24v24H0z" fill="none"/>
</svg>`;

icons['italic'] =
  `<svg fill="#2d2d2d" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0h24v24H0z" fill="none"/>
<path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/>
</svg>`;

icons['underline'] =
  `<svg fill="#2d2d2d" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0h24v24H0z" fill="none"/>
<path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/>
</svg>`;

icons['strike'] =
  `<svg fill="#2d2d2d" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
          <path d="M0 0h24v24H0V0z" id="a"/>
      </defs>
      <clipPath id="b">
          <use overflow="visible" xlink:href="#a"/>
      </clipPath>
      <path clip-path="url(#b)" d="M7.24 8.75c-.26-.48-.39-1.03-.39-1.67 0-.61.13-1.16.4-1.67.26-.5.63-.93 1.11-1.29.48-.35 1.05-.63 1.7-.83.66-.19 1.39-.29 2.18-.29.81 0 1.54.11 2.21.34.66.22 1.23.54 1.69.94.47.4.83.88 1.08 1.43.25.55.38 1.15.38 1.81h-3.01c0-.31-.05-.59-.15-.85-.09-.27-.24-.49-.44-.68-.2-.19-.45-.33-.75-.44-.3-.1-.66-.16-1.06-.16-.39 0-.74.04-1.03.13-.29.09-.53.21-.72.36-.19.16-.34.34-.44.55-.1.21-.15.43-.15.66 0 .48.25.88.74 1.21.38.25.77.48 1.41.7H7.39c-.05-.08-.11-.17-.15-.25zM21 12v-2H3v2h9.62c.18.07.4.14.55.2.37.17.66.34.87.51.21.17.35.36.43.57.07.2.11.43.11.69 0 .23-.05.45-.14.66-.09.2-.23.38-.42.53-.19.15-.42.26-.71.35-.29.08-.63.13-1.01.13-.43 0-.83-.04-1.18-.13s-.66-.23-.91-.42c-.25-.19-.45-.44-.59-.75-.14-.31-.25-.76-.25-1.21H6.4c0 .55.08 1.13.24 1.58.16.45.37.85.65 1.21.28.35.6.66.98.92.37.26.78.48 1.22.65.44.17.9.3 1.38.39.48.08.96.13 1.44.13.8 0 1.53-.09 2.18-.28s1.21-.45 1.67-.79c.46-.34.82-.77 1.07-1.27s.38-1.07.38-1.71c0-.6-.1-1.14-.31-1.61-.05-.11-.11-.23-.17-.33H21z" fill="#2d2d2d"/>
  </svg>`;


icons['blockquote'] =
  `<svg fill="#2d2d2d" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
<path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
<path d="M0 0h24v24H0z" fill="none"/>
</svg>`;

icons['code-block'] =
  `<svg fill="#2d2d2d" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0V0z" fill="none"/>
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
  </svg>`;


icons['indent']['+1'] =
  `<svg fill="#2d2d2d" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
  </svg>`;

icons['list']['ordered'] =
  `<svg fill="#2d2d2d" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
<path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/>
<path d="M0 0h24v24H0z" fill="none"/>
</svg>`;

icons['list']['bullet'] =
  `<svg fill="#2d2d2d" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
<path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/>
<path d="M0 0h24v24H0V0z" fill="none"/>
</svg>`;

icons['indent']['-1'] =
  `<svg fill="#2d2d2d" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
<path d="M11 17h10v-2H11v2zm-8-5l4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/>
<path d="M0 0h24v24H0z" fill="none"/>
</svg>`;

icons['indent']['+1'] =
  `<svg fill="#2d2d2d" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
  </svg>`;

  icons['color'] =
    `<svg fill="#2d2d2d" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M0 20h24v4H0z" fill-opacity=".36"/>
        <path d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"/>
    </svg>`;


    icons['background'] =
      `<svg fill="#2d2d2d" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"/>
          <path d="M0 20h24v4H0z" fill-opacity=".36"/>
      </svg>`;

export default icons
