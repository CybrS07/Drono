document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for table of contents links
    const tocLinks = document.querySelectorAll('.toc-links a');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                const sectionTop = targetSection.offsetTop - headerHeight - 30;
                
                // Smooth scroll to section
                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth'
                });
                
                // Highlight the section briefly
                targetSection.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.5)';
                targetSection.style.transition = 'box-shadow 0.3s ease';
                
                setTimeout(() => {
                    targetSection.style.boxShadow = '';
                }, 1500);
            }
        });
    });
    
    // Highlight current section while scrolling
    const policySections = document.querySelectorAll('.policy-section');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    function highlightCurrentSection() {
        let currentSection = null;
        
        policySections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section;
            }
        });
        
        // Update active link in table of contents
        if (currentSection) {
            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection.id}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Debounce scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(highlightCurrentSection, 100);
    });
    
    // Initialize
    highlightCurrentSection();
    
    // Add visual feedback for policy points
    const policyPoints = document.querySelectorAll('.policy-point');
    
    policyPoints.forEach(point => {
        point.addEventListener('click', function() {
            this.style.transform = 'translateX(8px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
        
        // Make keyboard accessible
        point.setAttribute('tabindex', '0');
        point.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.style.transform = 'translateX(8px)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            }
        });
    });
    
    // Add print confirmation
    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', function(e) {
            if (!window.confirm('Print all terms and conditions? This may take a few pages.')) {
                e.preventDefault();
            } else {
                // Store original button text
                const originalText = this.innerHTML;
                this.innerHTML = '🖨️ Printing...';
                this.disabled = true;
                
                // Restore button after print dialog
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    }
    
    // Add section navigation with arrow keys
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            
            const currentSection = document.querySelector('.policy-section:target') || 
                                  document.querySelector('.policy-section');
            
            if (currentSection) {
                const sections = Array.from(policySections);
                const currentIndex = sections.indexOf(currentSection);
                let nextIndex;
                
                if (e.key === 'ArrowDown') {
                    nextIndex = Math.min(currentIndex + 1, sections.length - 1);
                } else {
                    nextIndex = Math.max(currentIndex - 1, 0);
                }
                
                const nextSection = sections[nextIndex];
                const nextSectionTop = nextSection.offsetTop - headerHeight - 30;
                
                window.scrollTo({
                    top: nextSectionTop,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                window.location.hash = nextSection.id;
            }
        }
    });
    
    // Add visual indicator for prohibited items
    const prohibitedItems = document.querySelectorAll('.rules-list.prohibited li');
    prohibitedItems.forEach(item => {
        item.style.color = '#ff8a8a';
        item.style.fontWeight = '500';
    });
    
    // Initialize table of contents links with active state
    tocLinks.forEach(link => {
        link.style.cssText += 'position: relative; overflow: hidden;';
        
        // Add hover effect
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add active state styles
    const style = document.createElement('style');
    style.textContent = `
        .toc-links a.active {
            background: rgba(76, 175, 80, 0.2) !important;
            border-color: #4CAF50 !important;
            color: #4CAF50 !important;
            font-weight: 600;
        }
        
        .toc-links a.active::after {
            content: ' →';
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
});