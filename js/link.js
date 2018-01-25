




/*
     FILE ARCHIVED ON 8:48:43 Mar 22, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 0:36:57 Aug 2, 2016.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
//-----------------------------------------------------------------------------    
function new_character()
{
  var hash = "#0100000B0B0B0B0B0B0B0B01010101010101010101010101010101010101010101010101";
  
  window.location.hash = hash;
  
  decode_link();
}
//-----------------------------------------------------------------------------    
// Create hex values to add to hash
function decToHex(value, len)
{
  var hD = "0123456789ABCDEF";
  var h = hD.substr(value & 15, 1);
  
  while (value > 15) 
  {
    value >>= 4;
    h = hD.substr(value & 15, 1) + h;
  } // while
  
  while (h.length < len)
  {  
    h = "0" + h;
  } // while
  
  return h;
}
//-----------------------------------------------------------------------------    
// Create a hash value to use for linked builds
function create_link()
{
  var hash = "", i;
  
  hash = hash + decToHex(st_stats[0], 2);
  hash = hash + decToHex(st_stats[1], 4);
  
  for (i = CHARI; i <= TH_CO; i++) // all attributes, skills & mutations
  {
    hash = hash + decToHex(st_stats[i], 2);
  } // for i
    
  window.location.hash = hash;
}
//-----------------------------------------------------------------------------
function show_build(link)
{
  window.location.hash = link;
  decode_link();
  close_all_sub_windows();
}
//-----------------------------------------------------------------------------
// Decode the given hash link into something readable
function decode_link()
{
  var hash = window.location.hash;
	var reg = /[^0-9A-F]/g;

  if (areCookiesEnabled())
  {
    document.getElementById("no_cookies").style.visibility = "hidden";
  }

  loadStatsFromCookie();

  if (hash.length == 0) 
  {
    hash = "#0100000B0B0B0B0B0B0B0B01010101010101010101010101160101010101010101010101";
  }
  
	hash = hash.replace(reg, "");
  if (hash.length != 72)
  {
    alert("Invalid Build Link - Setting Defaults " + hash.length + "(" + hash + ")");    
    hash = "#0100000B0B0B0B0B0B0B0B01010101010101010101010101160101010101010101010101";
    window.location.hash = hash;
    decode_link();
    return;
  } // else correct length of hex values

  st_stats[LEVEL]   = get_hash_value(hash, 0, 2);
  st_stats[BONUSAP] = get_hash_value(hash, 2, 4);
  
  for (i = CHARI; i <= TH_CO; i++) // all attributes, skills & mutations
  {
    st_stats[i] = get_hash_value(hash, 6 + ((i - 2) * 2), 2);
  } // for i
  
  st_stats[CRAFT] = 1; // crafting
  
  for (i = LEVEL; i <= TH_CO; i++) // all character details, attributes, skills & mutations
  {
    window["g" + i].setValue(st_stats[i], false);
  } // for i
  
  saveStatsToCookie();

  setStats();
  
  display_character();
}
//-----------------------------------------------------------------------------
// Read a value from a hash, and convert it to decimal    
function get_hash_value(hash, sta, len)
{
  var hex, dec;
  
  hex = hash.substr(sta, len);
  dec = parseInt(hex, 16);

  return dec;
}
//-----------------------------------------------------------------------------    
function reload()
{
  decode_link();
}
//-----------------------------------------------------------------------------    
function load()
{
  var link = prompt("Enter Full URL (link) or build hash tag (starting with #):","#0100000B0B0B0B0B0B0B0B01010101010101010101010101160101010101010101010101");
  var x = link.indexOf("#", 0);
  // Remove everything before the last # symbol
  while (x > 0)
  {
    link = link.substr(x);
    x = link.indexOf("#", 0);
  }
  
  window.location.hash = link;
  
  decode_link();
}
//-----------------------------------------------------------------------------    
