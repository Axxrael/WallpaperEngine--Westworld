var content, createEditor, loadText, showSavedToast;

content = $(".content");

loadText = (function(_this) {
  return function() {
    var text;
    text = window.localStorage.getItem("NotepadNotes");
    if (text) {
      return content.html(text);
    }
  };
})(this);

createEditor = (function(_this) {
  return function() {
    var changed, editor, saveTimer;
    editor = new MediumEditor('.content', {
      toolbar: {
        buttons: ['bold', 'italic', 'underline', 'strikethrough', 'anchor', 'h1', 'h2', 'h3', 'orderedlist', 'unorderedlist', 'image', 'pre', 'quote']
      }
    });
    changed = false;
    saveTimer = null;
    return editor.subscribe("editableInput", function() {
      changed = true;
      if (saveTimer != null) {
        clearTimeout(saveTimer);
      }
      return saveTimer = setTimeout(function() {
        console.log("Save note...");
        window.localStorage.setItem("NotepadNotes", content.html());
        changed = false;
        saveTimer = null;
        return showSavedToast();
      }, 2000);
    });
  };
})(this);

showSavedToast = (function(_this) {
  return function() {
    var el;
    el = $(".saveMessage");
    el.removeClass("visible");
    el[0].offsetWidth = el[0].offsetWidth;
    return el.addClass("visible");
  };
})(this);

$(function() {
  loadText();
  return createEditor();
});