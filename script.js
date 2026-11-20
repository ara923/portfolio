// =========================
// 프로젝트 데이터 (여기만 수정하면 카드가 바뀝니다)
// =========================
const projects = [
  {
    title: "개인 블로그 플랫폼",
    desc: "마크다운 기반 글 작성과 태그 검색을 지원하는 블로그 서비스.",
    category: "web",
    emoji: "📝",
    color: "#4f6df5",
    tags: ["React", "Node.js", "MySQL"],
    demo: "#",
    code: "#",
  },
  {
    title: "날씨 대시보드",
    desc: "공공 API를 활용해 지역별 날씨와 미세먼지 정보를 시각화.",
    category: "web",
    emoji: "🌤️",
    color: "#14b8a6",
    tags: ["JavaScript", "Chart.js", "API"],
    demo: "#",
    code: "#",
  },
  {
    title: "습관 트래커 앱",
    desc: "매일의 습관을 기록하고 달성률을 확인하는 모바일 웹앱.",
    category: "app",
    emoji: "✅",
    color: "#f59e0b",
    tags: ["PWA", "LocalStorage"],
    demo: "#",
    code: "#",
  },
  {
    title: "미니 게임 모음",
    desc: "바닐라 JS로 만든 간단한 퍼즐·반응속도 게임 모음.",
    category: "toy",
    emoji: "🎮",
    color: "#ec4899",
    tags: ["Canvas", "JavaScript"],
    demo: "#",
    code: "#",
  },
];

// =========================
// 프로젝트 렌더링
// =========================
const projectList = document.getElementById("projectList");

function renderProjects() {
  projectList.innerHTML = projects
    .map(
      (p) => `
      <article class="project reveal" data-category="${p.category}">
        <div class="project__thumb" style="background:${p.color}22">${p.emoji}</div>
        <div class="project__body">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <ul class="tags">${p.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
          <div class="project__links">
            <a href="${p.demo}" target="_blank" rel="noopener">Live Demo →</a>
            <a href="${p.code}" target="_blank" rel="noopener">GitHub →</a>
          </div>
        </div>
      </article>`
    )
    .join("");
}
renderProjects();

// =========================
// 프로젝트 필터
// =========================
document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;

  document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  const filter = btn.dataset.filter;
  document.querySelectorAll(".project").forEach((card) => {
    const match = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("hide", !match);
  });
});

// =========================
// 타이핑 효과
// =========================
const roles = ["Frontend Developer", "UI/UX Enthusiast", "Problem Solver"];
const typingEl = document.getElementById("typing");
let roleIdx = 0;
let charIdx = 0;
let deleting = false;

function type() {
  const current = roles[roleIdx];
  typingEl.textContent = current.slice(0, charIdx);

  if (!deleting && charIdx < current.length) {
    charIdx++;
    setTimeout(type, 90);
  } else if (deleting && charIdx > 0) {
    charIdx--;
    setTimeout(type, 45);
  } else {
    deleting = !deleting;
    if (!deleting) roleIdx = (roleIdx + 1) % roles.length;
    setTimeout(type, deleting ? 1600 : 300);
  }
}
type();

// =========================
// 다크 모드
// =========================
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function setTheme(theme) {
  root.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem("theme", theme); } catch {}
}

let savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch {}
setTheme(savedTheme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

// =========================
// 모바일 메뉴
// =========================
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  navToggle.textContent = open ? "✕" : "☰";
  navToggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
});

navMenu.addEventListener("click", (e) => {
  if (e.target.matches(".nav__link")) {
    navMenu.classList.remove("open");
    navToggle.textContent = "☰";
  }
});

// =========================
// 스크롤: 헤더 / Top 버튼 / 현재 섹션 하이라이트
// =========================
const header = document.getElementById("header");
const toTop = document.getElementById("toTop");
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav__link");

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 20);
  toTop.classList.toggle("show", y > 500);

  let currentId = "";
  sections.forEach((sec) => {
    if (y >= sec.offsetTop - 120) currentId = sec.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toTop.addEventListener("click", () => window.scrollTo({ top: 0 }));

// =========================
// 스크롤 등장 애니메이션
// =========================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// =========================
// 연락 폼 (데모: 실제 전송 X)
// =========================
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  form.querySelectorAll("[required]").forEach((field) => {
    const ok = field.value.trim() !== "" && field.checkValidity();
    field.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    statusEl.textContent = "모든 항목을 올바르게 입력해 주세요.";
    statusEl.className = "form-status error";
    return;
  }

  // TODO: Formspree, EmailJS 등 실제 전송 서비스 연결
  statusEl.textContent = "메시지가 전송되었습니다. 감사합니다! (데모)";
  statusEl.className = "form-status success";
  form.reset();
});

// =========================
// 푸터 연도
// =========================
document.getElementById("year").textContent = new Date().getFullYear();
