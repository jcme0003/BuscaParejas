let deferredPrompt;
var ventana = document.getElementById('ventana-instalar');
window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    ventana.style.display = 'block';
});
// Cerrar
var cerrar = document.getElementsByClassName('cerrar')[0];
cerrar.onclick = function() {
    ventana.style.display = 'none';
}
var cancelar = document.getElementsByClassName('cerrar')[1];
cancelar.onclick = function() {
    ventana.style.display = 'none';
}
window.onclick = function(event) {
    if(event.target == ventana) {
        ventana.style.display = 'none';
    }
}
// Instalar
function offlinePrompt() {
    ventana.style.display = 'none';
    deferredPrompt.prompt();
}