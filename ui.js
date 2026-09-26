// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let threshold = spec.threshold || 0;
  parts.log.textContent = "数值 " + (spec.values || []).length + " 个，阈值 " + threshold + "。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { threshold: threshold }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    (spec.values || []).forEach(function (value, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = String(value);
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, Math.max(0, value)) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip" + (view.flags[spot] ? " ok" : "");
      mark.textContent = view.flags[spot] ? "超阈值" : "未超";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "最长连续段 " + view.longest + "，段数 " + view.runs;
    parts.log.textContent = "阈值 " + threshold;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "找最长段";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const moreButton = document.createElement("button");
  moreButton.textContent = "阈值加五";
  moreButton.addEventListener("click", function () {
    threshold = threshold + 5;
    draw();
  });
  parts.controls.appendChild(moreButton);

  const lessButton = document.createElement("button");
  lessButton.textContent = "阈值减五";
  lessButton.addEventListener("click", function () {
    threshold = threshold - 5;
    draw();
  });
  parts.controls.appendChild(lessButton);

  const label = document.createElement("label");
  label.textContent = "阈值";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = String(threshold);
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (!Number.isNaN(parsed)) { threshold = parsed; draw(); }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看最长段";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { threshold: threshold }));
    parts.out.textContent = "最长连续段 " + view.longest + "，段数 " + view.runs;
  });
  parts.controls.appendChild(readButton);

  draw();
}
