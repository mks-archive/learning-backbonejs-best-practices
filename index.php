<?php
/**
 * @version stack-editor-v0.1
 */
include_once( dirname( $_SERVER['DOCUMENT_ROOT'] ) . '/www/wp-load.php' );
ob_start();
?>
<!--
 * The purpose of Stack Editor is is to represent a to-be-generated web page that will have a header and a series of
 * horizontally flowing content containers. The collection of content containers is termed a "Stack" and each
 * container is termed a "Layer." Besides adding and arranging layers the Stack Editor allows query criteria to be
 * established for each Layer where the criteria determines the content that will populate the layer.
 *-->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Stack Editor</title>
  <link href="css/styles.css" rel="stylesheet" />
  <link href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" rel="stylesheet" />
  <link href="http://cdnjs.cloudflare.com/ajax/libs/chosen/0.9.15/chosen.css" rel="stylesheet" />
</head>
<body>
  <div id="editor-container"></div>
  <?php echo include( __DIR__ . '/includes/load-data.php' ); ?>
  <?php echo include( __DIR__ . '/includes/load-templates.php' ); ?>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.js"></script>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/jquery-ui.js"></script>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore.js"></script>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone.js"></script>
  <script src="js/scripts.js"></script>
  <input type="hidden" id="stack-json" name="stack_json" />
</body>
</html>
<?php
$html = ob_get_clean();
file_put_contents( __DIR__ . '/index.html', $html );
echo $html;
