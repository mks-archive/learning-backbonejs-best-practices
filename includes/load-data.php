<?php
/**
 * load-data.php - Inserts a JSON array of data into footer of index.php
 */

$data = array(
  'content-types-select' => Spark_City::get_terms_for_html_select( 'sc_content_type' ),
  'layouts-select' => Spark_City::get_terms_for_html_select( 'sc_layout' ),
);

$data = htmlentities( json_encode( $data ) );
return <<<HTML
<pre id="backbone-data" class="hidden">
{$data}
</pre>
HTML;
