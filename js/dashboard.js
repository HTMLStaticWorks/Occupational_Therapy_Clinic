/* RehabNest Occupational Therapy - Patient Dashboard Logic */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardSidebar();
  initDashboardTabs();
  initExerciseChecklist();
  initBookingSimulation();
});

/* Sidebar Mobile Drawer Toggle */
function initDashboardSidebar() {
  const sidebarToggles = document.querySelectorAll('#sidebar-toggle, #sidebar-close');
  const sidebar = document.getElementById('dashboard-sidebar');

  if (sidebar && sidebarToggles.length) {
    sidebarToggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024 && sidebar.classList.contains('active')) {
        let isToggleClick = false;
        sidebarToggles.forEach(btn => {
          if (btn.contains(e.target)) isToggleClick = true;
        });
        if (!sidebar.contains(e.target) && !isToggleClick) {
          sidebar.classList.remove('active');
        }
      }
    });
  }
}

/* Dashboard Tab Switching */
function initDashboardTabs() {
  const sidebarLinks = document.querySelectorAll('.sidebar-link[data-tab]');
  const dashboardTabs = document.querySelectorAll('.dashboard-tab');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTabId = link.getAttribute('data-tab');

      // Set active link
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Show active tab
      dashboardTabs.forEach(tab => {
        if (tab.id === `tab-${targetTabId}`) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });

      // On mobile, close sidebar after selecting tab
      if (window.innerWidth <= 1024) {
        const sidebar = document.getElementById('dashboard-sidebar');
        if (sidebar) sidebar.classList.remove('active');
      }
    });
  });
}

/* Exercise Completion Progress Calculator */
function initExerciseChecklist() {
  const checkboxes = document.querySelectorAll('.exercise-check');
  const progressVal = document.getElementById('exercise-progress-percent');
  const progressBar = document.getElementById('exercise-progress-bar');
  const completedCount = document.getElementById('completed-exercise-count');

  if (!checkboxes.length) return;

  function updateProgress() {
    const total = checkboxes.length;
    let checked = 0;

    checkboxes.forEach(cb => {
      if (cb.checked) checked++;
    });

    const percentage = Math.round((checked / total) * 100);

    if (progressVal) progressVal.innerText = `${percentage}%`;
    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (completedCount) completedCount.innerText = `${checked} of ${total}`;
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateProgress);
  });

  updateProgress();
}

/* Booking Simulation */
function initBookingSimulation() {
  const bookForm = document.getElementById('dashboard-book-form');
  if (!bookForm) return;

  bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('🎉 Success! Your therapy session appointment has been scheduled. Your therapist will review your pre-session notes.');
    bookForm.reset();
  });
}
