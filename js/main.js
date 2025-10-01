
// Smooth scroll for nav links
document.querySelectorAll('a.nav-link').forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    // collapse navbar on mobile
    const bsCollapse = document.querySelector('.navbar-collapse');
    if(bsCollapse && bsCollapse.classList.contains('show')){
      new bootstrap.Collapse(bsCollapse).hide();
    }
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section, header');
function onScroll(){
  let fromTop = window.scrollY + 80;
  let current = null;
  sections.forEach(section=>{
    if(section.offsetTop <= fromTop) current = section;
  });
  if(current){
    document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
    const id = current.id || 'hero';
    const link = document.querySelector('.nav-link[href="#'+id+'"]');
    if(link) link.classList.add('active');
  }
}
window.addEventListener('scroll', onScroll);
onScroll();

// Lightbox modal
const lightboxModal = document.getElementById('lightboxModal');
lightboxModal.addEventListener('show.bs.modal', function (event) {
  const button = event.relatedTarget;
  const img = button.getAttribute('data-img');
  const target = document.getElementById('lightboxImage');
  target.src = img;
});

// Form validation
const form = document.getElementById('contactForm');
form.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  let ok = true;

  // name
  if(!name.value || name.value.length < 2 || name.value.length > 60){
    name.classList.add('is-invalid'); ok=false;
  } else { name.classList.remove('is-invalid'); }

  // email simple regex
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRe.test(email.value)){
    email.classList.add('is-invalid'); ok=false;
  } else { email.classList.remove('is-invalid'); }

  if(!message.value || message.value.length < 10 || message.value.length > 500){
    message.classList.add('is-invalid'); ok=false;
  } else { message.classList.remove('is-invalid'); }

  const alert = document.getElementById('formAlert');
  if(ok){
    alert.innerHTML = '<div class="alert alert-success">Thanks! Your message was sent.</div>';
    form.reset();
  } else {
    alert.innerHTML = '<div class="alert alert-danger">Please correct the errors in the form.</div>';
  }
});

// Today's Special badge 
function updateSpecialBadge(){
  const el = document.getElementById('specialBadge');
  const d = new Date();
  const day = d.getDay(); // 0 Sun - 6 Sat
  // show special on Friday(5), Saturday(6), Sunday(0)
  if([0,5,6].includes(day)){
    el.innerHTML = '<span class="badge bg-danger fs-6">Today\'s Special: Truffle Pasta</span>';
  } else {
    el.innerHTML = '';
  }
}
updateSpecialBadge();

// Dark mode toggle with localStorage
const darkToggle = document.getElementById('darkToggle');
function applyDark(dark){
  if(dark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
  darkToggle.textContent = dark ? 'Light' : 'Dark';
  darkToggle.setAttribute('aria-pressed', String(dark));
}
const saved = localStorage.getItem('savory-dark') === 'true';
applyDark(saved);
darkToggle.addEventListener('click', ()=>{
  const now = document.documentElement.classList.toggle('dark');
  localStorage.setItem('savory-dark', String(now));
  applyDark(now);
});
