<?php
/**
 * load-templates.php - Inserts a JSON array of templates into footer of index.php
 */

//header( "Content-type:application/json");
$directory = dirname( __DIR__ ) . '/templates';
$templates = array();
if ( $handle = opendir( $directory ) ) {
  while ( false !== ( $entry = readdir( $handle ) ) ) {
    if ( '.' == $entry || '..' == $entry )
      continue;
    if ( ! preg_match( '#^(.*)\.html$#', $entry, $match ) )
      continue;
    $templates[$match[1]] = rtrim( file_get_contents( "{$directory}/{$entry}") );
  }
  closedir( $handle );
}
$templates = htmlentities( json_encode( $templates ) );
return <<<HTML
<pre id="backbone-templates" style="display:none">
{$templates}
</pre>
HTML;
