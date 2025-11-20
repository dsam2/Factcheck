const ham = document.querySelector(".hamburger");
  const menu = document.querySelector(".category-links");

  ham.addEventListener("click", () => {
      ham.classList.toggle("active");
      menu.classList.toggle("active");
  });
  function scrollCarousel(containerId, scrollAmount) {
            const container = document.getElementById(containerId);
            
            if (container) {
                container.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        }
        // Function to get the current time and update the HTML
    function updateDateTime() {
        
        const now = new Date();
        const dateTimeString = now.toLocaleString();
        document.getElementById('liveClock').textContent = dateTimeString;

    }

    updateDateTime();
    setInterval(updateDateTime, 1000);


// Tab Switching Logic
        function switchTab(tab) {
            const urlContent = document.getElementById('content-url');
            const textContent = document.getElementById('content-text');
            const urlTab = document.getElementById('tab-url');
            const textTab = document.getElementById('tab-text');

            if (tab === 'url') {
                urlContent.classList.remove('hidden');
                urlContent.classList.add('block');
                textContent.classList.add('hidden');
                textContent.classList.remove('block');

                // Style Updates
                urlTab.classList.add('text-royal', 'border-b-2', 'border-royal', 'bg-white');
                urlTab.classList.remove('text-gray-500', 'hover:text-gray-700');
                
                textTab.classList.remove('text-royal', 'border-b-2', 'border-royal', 'bg-white');
                textTab.classList.add('text-gray-500', 'hover:text-gray-700');
            } else {
                urlContent.classList.add('hidden');
                urlContent.classList.remove('block');
                textContent.classList.remove('hidden');
                textContent.classList.add('block');

                // Style Updates
                textTab.classList.add('text-royal', 'border-b-2', 'border-royal', 'bg-white');
                textTab.classList.remove('text-gray-500', 'hover:text-gray-700');
                
                urlTab.classList.remove('text-royal', 'border-b-2', 'border-royal', 'bg-white');
                urlTab.classList.add('text-gray-500', 'hover:text-gray-700');
            }
        }

        // Clear Input Logic
        function clearInput(id) {
            document.getElementById(id).value = '';
            document.getElementById(id).focus();
        }

        // Character Counter Logic
        const textInput = document.getElementById('text-input');
        const charCount = document.getElementById('char-count');

        textInput.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCount.textContent = `${currentLength} chars`;
            if(currentLength > 0 && currentLength < 50) {
                charCount.classList.add('text-amber');
                charCount.classList.remove('text-gray-400');
            } else if (currentLength >= 50) {
                charCount.classList.add('text-emerald');
                charCount.classList.remove('text-amber');
            } else {
                charCount.classList.remove('text-amber', 'text-emerald');
                charCount.classList.add('text-gray-400');
            }
        });

        // Mock Analyze Function
        function analyze() {
            const btn = document.getElementById('analyze-btn');
            const loader = document.getElementById('loading-state');
            
            // Hide button text, show loader
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
            btn.classList.add('cursor-not-allowed', 'opacity-75');
            loader.classList.remove('hidden');

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<span>Analyze Veracity</span><i class="fa-solid fa-arrow-right ml-2"></i>';
                btn.classList.remove('cursor-not-allowed', 'opacity-75');
                loader.classList.add('hidden');
                
                // In a real app, this would redirect or show a modal
                alert("This is a demo UI. In the full version, this would redirect to the detailed analysis dashboard!");
            }, 2000);
        }       