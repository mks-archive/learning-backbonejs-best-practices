<?php
/**
 * @version stack-editor-v0.1
 */
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
</head>
<body>
  <div id="stack-editor">
    <div id="layer-addition-container" class="box">
      <p>Step 1. Add a Layer to the Stack:</p>
      <form id="layer-addition-form">
        <div class="input-wrapper">
          <label for="content-type-select">A. Select Content Type:</label> <select id="content-type-select">To Be Replaced</select>
        </div>
        <div class="input-wrapper">
          <label for="layout-type-select">B. Select Layout:</label> <select id="layout-type-select"><option>To Be Replaced</option></select>
        </div>
        <div class="input-wrapper">
          <label for="layout-type-select">C. Add to Stack:</label> <button id="add-layer-button">Add Layer</button>
        </div>
      </form>
      <div class="clear"></div>
    </div>
    <div id="stack-wrapper" class="box side-by-side">
      <p>Step 2. Reorder and/or Select Layer to Configure:</p>
      <div id="stack-container"></div>
    </div>
    <div id="layer-form-wrapper" class="box side-by-side">
      <p>Step 3. Configure Layer:</p>
      <div id="layer-form-container"></div>
      <div class="clear"></div>
    </div>
  </div>
  <?php echo include( __DIR__ . '/includes/load-templates.php' ); ?>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.js"></script>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/jquery-ui.js"></script>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore.js"></script>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone.js"></script>
  <script src="js/scripts.js"></script>
</body>
</html>
