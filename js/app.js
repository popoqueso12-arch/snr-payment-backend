/* Interactividad mock del clon SNR: sin backend real.
   Oficina de Registro -> Matricula (se acepta cualquier valor) -> Carrito -> Pago simulado -> Descarga simulada. */
(function () {
  "use strict";

  var cart = [];
  try {
    cart = JSON.parse(localStorage.getItem("snr_mock_cart") || "[]");
  } catch (e) {
    cart = [];
  }
  var selectedOficina = null;

  function formatCOP(n) {
    return n.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function saveCart() {
    localStorage.setItem("snr_mock_cart", JSON.stringify(cart));
  }

  /* ---------- Dialogs (reemplazan a PrimeFaces ui-dialog, que dependia de JS del servidor) ---------- */
  function ensureOverlay() {
    var ov = document.getElementById("mockOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "mockOverlay";
      ov.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:99999;display:none;";
      document.body.appendChild(ov);
      ov.addEventListener("click", closeAllDialogs);
    }
    return ov;
  }
  function openDialog(id) {
    ensureOverlay().style.display = "block";
    var el = document.getElementById(id);
    if (!el) return;
    el.style.cssText += "display:block;position:fixed;top:8%;left:50%;transform:translateX(-50%);z-index:100000;max-width:92vw;";
    el.setAttribute("aria-hidden", "false");
  }
  function closeAllDialogs() {
    var dialogs = document.querySelectorAll(".ui-dialog");
    for (var i = 0; i < dialogs.length; i++) {
      dialogs[i].style.display = "none";
      dialogs[i].setAttribute("aria-hidden", "true");
    }
    var ov = document.getElementById("mockOverlay");
    if (ov) ov.style.display = "none";
  }
  var closeButtons = document.querySelectorAll(".ui-dialog-titlebar-close");
  for (var ci = 0; ci < closeButtons.length; ci++) {
    closeButtons[ci].addEventListener("click", function (e) {
      e.preventDefault();
      closeAllDialogs();
    });
  }

  /* ---------- Autocomplete de Oficina de Registro ---------- */
  var oInput = document.getElementById("formOficinas:autoCompleteOficinas_input");
  var oHidden = document.getElementById("formOficinas:autoCompleteOficinas_hinput");
  var oWrapper = document.getElementById("formOficinas:autoCompleteOficinas");
  var oButton = document.getElementById("formOficinas:autoCompleteOficinas_button");
  var panel = null;

  function ensurePanel() {
    if (panel) return panel;
    panel = document.createElement("div");
    panel.className = "ui-autocomplete-panel ui-widget-content ui-corner-all ui-helper-hidden ui-shadow";
    panel.style.position = "absolute";
    panel.style.zIndex = "100001";
    panel.style.maxHeight = "260px";
    panel.style.overflowY = "auto";
    document.body.appendChild(panel);
    return panel;
  }

  function hidePanel() {
    ensurePanel().classList.add("ui-helper-hidden");
  }

  function renderSuggestions(list) {
    var p = ensurePanel();
    if (list.length === 0) {
      p.classList.add("ui-helper-hidden");
      return;
    }
    var ul = document.createElement("ul");
    ul.className = "ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset";
    ul.setAttribute("role", "listbox");
    list.forEach(function (o) {
      var li = document.createElement("li");
      li.className = "ui-autocomplete-item ui-autocomplete-list-item ui-corner-all";
      li.setAttribute("role", "option");
      li.textContent = o.label;
      li.addEventListener("click", function () {
        selectOficina(o);
      });
      ul.appendChild(li);
    });
    p.innerHTML = "";
    p.appendChild(ul);
    var rect = oInput.getBoundingClientRect();
    p.style.left = rect.left + window.scrollX + "px";
    p.style.top = rect.bottom + window.scrollY + "px";
    p.style.width = oWrapper.getBoundingClientRect().width + "px";
    p.classList.remove("ui-helper-hidden");
  }

  function selectOficina(o) {
    selectedOficina = o;
    oInput.value = o.label;
    oHidden.value = o.id;
    oInput.classList.remove("ui-state-error");
    hidePanel();
  }

  if (oInput) {
    oInput.addEventListener("input", function () {
      selectedOficina = null;
      oHidden.value = "";
      var q = oInput.value.trim().toLowerCase();
      if (q.length < 1) {
        hidePanel();
        return;
      }
      var matches = OFICINAS.filter(function (o) {
        return o.label.toLowerCase().indexOf(q) !== -1;
      });
      renderSuggestions(matches);
    });
  }
  if (oButton) {
    oButton.addEventListener("click", function (e) {
      e.preventDefault();
      renderSuggestions(OFICINAS);
    });
  }
  document.addEventListener("click", function (e) {
    if (panel && !panel.contains(e.target) && e.target !== oInput && !oButton.contains(e.target)) {
      hidePanel();
    }
  });

  /* ---------- Buscar -> modal "Agregar al Carrito" ---------- */
  var matriculaInput = document.getElementById("formOficinas:inpMatricula");
  var btnBuscar = document.getElementById("formOficinas:btnBuscar");
  var pending = {};

  if (btnBuscar) {
    btnBuscar.addEventListener("click", function (e) {
      e.preventDefault();
      var valid = true;
      if (!selectedOficina) {
        oInput.classList.add("ui-state-error");
        valid = false;
      }
      var matricula = matriculaInput.value.trim();
      if (!matricula) {
        matriculaInput.classList.add("ui-state-error");
        valid = false;
      } else {
        matriculaInput.classList.remove("ui-state-error");
      }
      if (!valid) return;

      var oficinaSeleccionada = selectedOficina;
      setButtonLoading(btnBuscar, true, "Buscando...");

      setTimeout(function () {
        var direccion = generarDireccionMock();
        pending = {
          oficinaId: oficinaSeleccionada.id,
          oficinaLabel: oficinaSeleccionada.label,
          matricula: matricula,
          direccion: direccion
        };

        document.getElementById("mcMatricula").textContent = matricula;
        document.getElementById("mcOficina").textContent = oficinaSeleccionada.label;
        document.getElementById("mcDireccion").textContent = direccion;
        document.getElementById("mcEstado").textContent = "Disponible";

        setButtonLoading(btnBuscar, false);
        openDialog("modalMatriculaCarrito");
      }, 600 + Math.random() * 300);
    });
  }

  /* Pequeño estado de carga en un boton, para que la transicion no se sienta brusca
     (replica, en forma ligera, el loadingDialog real del sitio que se dispara en cada AJAX). */
  function setButtonLoading(btn, isLoading, loadingText) {
    var span = btn.querySelector(".ui-button-text");
    if (isLoading) {
      btn.dataset.originalText = span.textContent;
      span.innerHTML = '<span class="mini-spinner"></span>' + (loadingText || "Cargando...");
      btn.disabled = true;
      btn.style.opacity = "0.75";
      btn.style.cursor = "wait";
    } else {
      span.textContent = btn.dataset.originalText || span.textContent;
      btn.disabled = false;
      btn.style.opacity = "";
      btn.style.cursor = "";
    }
  }

  document.getElementById("mcAgregar").addEventListener("click", function (e) {
    e.preventDefault();
    var btn = e.currentTarget;
    setButtonLoading(btn, true, "Agregando...");
    setTimeout(function () {
      cart.push({
        oficinaId: pending.oficinaId,
        oficinaLabel: pending.oficinaLabel,
        matricula: pending.matricula,
        direccion: pending.direccion,
        precio: PRECIO_CERTIFICADO
      });
      saveCart();
      renderCart();
      setButtonLoading(btn, false);
      closeAllDialogs();
      oInput.value = "";
      oHidden.value = "";
      matriculaInput.value = "";
      selectedOficina = null;
    }, 450 + Math.random() * 200);
  });

  document.getElementById("mcCancelar").addEventListener("click", function (e) {
    e.preventDefault();
    closeAllDialogs();
  });

  /* ---------- Carrito ---------- */
  function oficinaCodigoNombre(label) {
    var idx = label.indexOf(" - ");
    if (idx === -1) return { codigo: label, nombre: "" };
    return { codigo: label.substring(0, idx), nombre: label.substring(idx + 3) };
  }

  function renderCart() {
    var container = document.getElementById("panelCarrito");
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = "";
      updateSteps(1);
      return;
    }

    var total = 0;
    var rows = "";
    cart.forEach(function (item, idx) {
      total += item.precio;
      var partes = oficinaCodigoNombre(item.oficinaLabel);
      rows +=
        '<tr class="tabla-carrito-row-focus">' +
        '<td style="padding:10px 8px;">' +
        '<div style="font-weight:700;color:#0b1c2d;">(' + partes.codigo + ") " + partes.nombre + " - " + item.matricula + "</div>" +
        '<div style="font-size:11.5px;color:#6b7a8f;margin-top:2px;">' + item.direccion + "</div>" +
        "</td>" +
        '<td style="text-align:right;white-space:nowrap;padding:10px 8px;color:#0b1c2d;">' + formatCOP(item.precio) + "</td>" +
        '<td style="text-align:center;padding:10px 8px;"><a href="#" class="cart-delete" data-idx="' + idx + '" title="Eliminar" style="color:#c0392b;text-decoration:none;font-size:15px;font-weight:700;">&#10006;</a></td>' +
        "</tr>";
    });

    container.innerHTML =
      '<div style="text-align:center;color:#fff;font-size:12px;margin-top:24px;margin-bottom:8px;">Puedes descargar hasta 10 certificados por transaccion *</div>' +
      '<div class="panel-home-carrito" style="max-width:640px;margin-left:auto;margin-right:auto;">' +
      '<table style="width:100%;border-collapse:collapse;background:#fff;">' +
      "<thead>" +
      '<tr class="tabla-carrito-header">' +
      '<td style="padding:8px;">Matricula inmobiliaria</td>' +
      '<td style="text-align:right;padding:8px;">Valor</td>' +
      "<td></td>" +
      "</tr>" +
      "</thead>" +
      "<tbody>" + rows + "</tbody>" +
      "</table>" +
      '<div style="text-align:right;padding:10px 8px 4px;color:#0b1c2d;font-weight:700;font-size:13px;">' +
      "Total : <span style=\"color:#0b4a0c;\">" + formatCOP(total) + "</span>" +
      "</div>" +
      '<div style="text-align:center;margin-top:12px;padding-bottom:4px;">' +
      '<button id="btnPagarCarrito" type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" style="background-color:#3772ff;background-image:none;border:none;border-radius:30px;padding:9px 40px;">' +
      '<span class="ui-button-text ui-c">Pagar</span>' +
      "</button>" +
      "</div>" +
      "</div>";

    var deleteLinks = container.querySelectorAll(".cart-delete");
    for (var i = 0; i < deleteLinks.length; i++) {
      deleteLinks[i].addEventListener("click", function (e) {
        e.preventDefault();
        var idx = parseInt(e.currentTarget.getAttribute("data-idx"), 10);
        cart.splice(idx, 1);
        saveCart();
        renderCart();
      });
    }

    document.getElementById("btnPagarCarrito").addEventListener("click", function (e) {
      e.preventDefault();
      var btn = e.currentTarget;
      setButtonLoading(btn, true, "Cargando...");
      setTimeout(function () {
        setButtonLoading(btn, false);
        openMedioPagoModal();
      }, 400 + Math.random() * 200);
    });

    updateSteps(2);
  }

  /* ---------- Wizard de pasos (1 Consultar / 2 Pagar / 3 Descargar) ---------- */
  function updateSteps(step) {
    var items = document.querySelectorAll('[id="formSteps:stepsWizard"] li');
    for (var i = 0; i < items.length; i++) {
      var n = i + 1;
      items[i].classList.remove("ui-state-highlight", "ui-state-disabled");
      if (n <= step) {
        items[i].classList.add("ui-state-highlight");
      } else {
        items[i].classList.add("ui-state-default", "ui-state-disabled");
      }
    }
  }

  /* ---------- Modal de seleccion de medio de pago ---------- */
  var currentReferencia = null;

  function openMedioPagoModal() {
    currentReferencia = String(Math.floor(100000000 + Math.random() * 900000000));
    document.getElementById("mpReferencia").textContent = currentReferencia;
    openDialog("modalMedioPago");
  }

  document.getElementById("mpCancelar").addEventListener("click", function (e) {
    e.preventDefault();
    closeAllDialogs();
  });

  var mpOptions = document.querySelectorAll(".mp-option");
  for (var mi = 0; mi < mpOptions.length; mi++) {
    mpOptions[mi].addEventListener("click", function (e) {
      e.preventDefault();
      if (e.currentTarget.getAttribute("data-metodo") === "tarjeta") {
        closeAllDialogs();
        openPagoModal();
      }
      /* Los demas medios de pago son solo visuales por ahora (PSE, Bancolombia, Voucher). */
    });
  }

  /* ---------- Modal de pago (correo + total) ---------- */
  function openPagoModal() {
    var total = cart.reduce(function (s, i) {
      return s + i.precio;
    }, 0);
    document.getElementById("pagoTotal").textContent = "$ " + formatCOP(total) + " COP";
    document.getElementById("pagoCount").textContent = cart.length;
    document.getElementById("pagoInputCorreo").value = "";
    document.getElementById("pagoInputCorreoVal").value = "";
    document.getElementById("pagoError").style.display = "none";
    openDialog("modalConfirmacionPago");
  }

  document.getElementById("pagoCancelar").addEventListener("click", function (e) {
    e.preventDefault();
    closeAllDialogs();
  });

  document.getElementById("pagoSubmit").addEventListener("click", function (e) {
    e.preventDefault();
    var c1 = document.getElementById("pagoInputCorreo").value.trim();
    var c2 = document.getElementById("pagoInputCorreoVal").value.trim();
    var errEl = document.getElementById("pagoError");
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c1);
    if (!emailOk) {
      errEl.textContent = "Ingresa un correo electrónico válido.";
      errEl.style.display = "block";
      return;
    }
    if (c1 !== c2) {
      errEl.textContent = "Los correos no coinciden.";
      errEl.style.display = "block";
      return;
    }
    errEl.style.display = "none";

    var btn = e.currentTarget;
    setButtonLoading(btn, true, "Redirigiendo...");
    setTimeout(function () {
      irAPagoTarjeta(c1);
    }, 500 + Math.random() * 200);
  });

  /* Redirige a la pagina de pago (clon del gateway real) con la transaccion pendiente guardada. */
  function irAPagoTarjeta(email) {
    var total = cart.reduce(function (s, i) {
      return s + i.precio;
    }, 0);
    var hoy = new Date();
    var fecha = String(hoy.getDate()).padStart(2, "0") + "/" + String(hoy.getMonth() + 1).padStart(2, "0") + "/" + hoy.getFullYear();
    var token = "";
    var hex = "0123456789ABCDEF";
    for (var i = 0; i < 24; i++) { token += hex[Math.floor(Math.random() * 16)]; }

    var pendiente = {
      idTransaccion: Math.floor(1000000 + Math.random() * 9000000),
      token: token,
      referencia: currentReferencia || String(Math.floor(100000000 + Math.random() * 900000000)),
      fecha: fecha,
      valor: total,
      correo: email,
      items: cart.slice()
    };
    localStorage.setItem("snr_pago_pendiente", JSON.stringify(pendiente));
    window.location.href = "pago.html";
  }

  /* Al volver de pago.html con ?pago=exitoso, mostrar la descarga y limpiar el carrito. */
  function revisarRetornoDePago() {
    if (window.location.search.indexOf("pago=exitoso") === -1) return;
    var pendiente = null;
    try { pendiente = JSON.parse(localStorage.getItem("snr_pago_pendiente") || "null"); } catch (ex) { pendiente = null; }
    if (pendiente) {
      cart = [];
      saveCart();
      renderCart();
      renderDescarga(pendiente.items, pendiente.correo);
      openDialog("modalDescarga");
      updateSteps(3);
      localStorage.removeItem("snr_pago_pendiente");
    }
    window.history.replaceState(null, "", "index.html");
  }

  /* ---------- Modal de descarga (mock) ---------- */
  function renderDescarga(items, email) {
    var list = document.getElementById("descargaLista");
    var html = "";
    items.forEach(function (item, i) {
      html +=
        '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 4px;border-bottom:1px solid #eee;gap:10px;">' +
        '<div style="text-align:left;">' +
        '<div style="font-weight:600;font-size:13px;">Matricula ' + item.matricula + "</div>" +
        '<div style="font-size:11px;color:gray;">' + item.oficinaLabel + "</div>" +
        "</div>" +
        '<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only btn-descargar-item" data-idx="' + i + '" type="button" style="background:#0b4a0c;color:#fff;white-space:nowrap;">' +
        '<span class="ui-button-text ui-c">Descargar</span>' +
        "</button>" +
        "</div>";
    });
    list.innerHTML = html;
    document.getElementById("descargaCorreo").textContent = email;

    var btns = list.querySelectorAll(".btn-descargar-item");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (e) {
        var idx = parseInt(e.currentTarget.getAttribute("data-idx"), 10);
        descargarMock(items[idx]);
      });
    }
  }

  function descargarMock(item) {
    var contenido =
      "CERTIFICADO DE TRADICIÓN Y LIBERTAD (DOCUMENTO DE PRUEBA / MOCK)\n" +
      "==================================================\n" +
      "Oficina de Registro : " + item.oficinaLabel + "\n" +
      "Matrícula Inmobiliaria : " + item.matricula + "\n" +
      "Dirección : " + item.direccion + "\n" +
      "Valor pagado : $ " + formatCOP(item.precio) + " COP\n" +
      "Fecha de generación : " + new Date().toLocaleString("es-CO") + "\n" +
      "--------------------------------------------------\n" +
      "Este es un documento de EJEMPLO generado por el clon de UI.\n" +
      "No tiene validez legal ni proviene de la SNR.\n";
    var blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "certificado-mock-" + item.matricula + ".txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  document.getElementById("descargaCerrar").addEventListener("click", function (e) {
    e.preventDefault();
    closeAllDialogs();
    updateSteps(1);
  });

  /* ---------- Init ---------- */
  renderCart();
  revisarRetornoDePago();
})();
