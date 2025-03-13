/**
 * HAT Component Test Suite
 * This script provides interactive testing functionality for HAT components
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize component testing framework
    initComponentTestFramework();
    
    // Add toast container for notifications
    addToastContainer();
    
    // Log initialization complete
    console.log('HAT Component Test Suite initialized successfully');
  });
  
  /**
   * Sets up the component testing framework
   */
  function initComponentTestFramework() {
    // Add testing toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'fixed bottom-4 left-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg z-50 flex gap-3';
    toolbar.innerHTML = `
      <button id="test-state-toggle" class="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700">Toggle States</button>
      <button id="test-animation-toggle" class="px-3 py-1 bg-green-600 rounded hover:bg-green-700">Run Animations</button>
      <button id="test-interaction-toggle" class="px-3 py-1 bg-purple-600 rounded hover:bg-purple-700">Test Interactions</button>
      <div class="test-status ml-3 flex items-center">Status: <span class="ml-2 inline-block w-3 h-3 rounded-full bg-gray-400"></span></div>
    `;
    document.body.appendChild(toolbar);
    
    // Set up event listeners for test buttons
    document.getElementById('test-state-toggle').addEventListener('click', toggleComponentStates);
    document.getElementById('test-animation-toggle').addEventListener('click', runComponentAnimations);
    document.getElementById('test-interaction-toggle').addEventListener('click', testComponentInteractions);
    
    // Add status indicator
    window.updateTestStatus = function(success = true) {
      const statusIndicator = document.querySelector('.test-status span');
      statusIndicator.className = `ml-2 inline-block w-3 h-3 rounded-full ${success ? 'bg-green-500' : 'bg-red-500'}`;
      
      // Reset after 2 seconds
      setTimeout(() => {
        statusIndicator.className = 'ml-2 inline-block w-3 h-3 rounded-full bg-gray-400';
      }, 2000);
    };
    
    // Add testing metadata to components
    document.querySelectorAll('.component-test-block').forEach((block, index) => {
      // Add test ID for automation
      block.setAttribute('data-test-id', `component-${index}`);
      
      // Add test controls to each component
      const controlsDiv = document.createElement('div');
      controlsDiv.className = 'mt-4 pt-4 border-t border-gray-200 flex gap-2 items-center';
      controlsDiv.innerHTML = `
        <span class="text-sm text-gray-500">Test:</span>
        <button class="test-state-btn px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded">States</button>
        <button class="test-anim-btn px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded">Animation</button>
        <button class="test-interaction-btn px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded">Interaction</button>
      `;
      
      block.appendChild(controlsDiv);
      
      // Add event listeners to component-specific test buttons
      controlsDiv.querySelector('.test-state-btn').addEventListener('click', () => {
        toggleComponentState(block);
      });
      
      controlsDiv.querySelector('.test-anim-btn').addEventListener('click', () => {
        runComponentAnimation(block);
      });
      
      controlsDiv.querySelector('.test-interaction-btn').addEventListener('click', () => {
        testComponentInteraction(block);
      });
    });
  }
  
  /**
   * Toggle all component states between default/hover/focus/active
   */
  function toggleComponentStates() {
    const stateClasses = ['hover', 'focus', 'active', 'disabled'];
    const stateIndex = parseInt(localStorage.getItem('hat-test-state-index') || '0');
    const newStateIndex = (stateIndex + 1) % (stateClasses.length + 1); // +1 for default state
    
    // Store the new state
    localStorage.setItem('hat-test-state-index', newStateIndex.toString());
    
    // Clear all states first
    document.querySelectorAll('.component-test-block').forEach(block => {
      stateClasses.forEach(cls => {
        const elements = block.querySelectorAll(`[data-state]`);
        elements.forEach(el => {
          if (el.dataset.state) {
            el.dataset.state = 'default';
          }
          
          // Remove state classes
          el.classList.remove(
            el.dataset.hoverClass, 
            el.dataset.focusClass, 
            el.dataset.activeClass, 
            el.dataset.disabledClass
          );
        });
      });
    });
    
    // Apply new state if not default (index 0)
    if (newStateIndex > 0) {
      const currentState = stateClasses[newStateIndex - 1];
      
      document.querySelectorAll('.component-test-block').forEach(block => {
        const elements = block.querySelectorAll(`[data-state]`);
        elements.forEach(el => {
          if (el.dataset.state && !el.hasAttribute('aria-disabled')) {
            el.dataset.state = currentState;
            
            // Add the appropriate class for this state
            const stateClassMap = {
              'hover': el.dataset.hoverClass,
              'focus': el.dataset.focusClass,
              'active': el.dataset.activeClass,
              'disabled': el.dataset.disabledClass
            };
            
            if (stateClassMap[currentState]) {
              el.classList.add(stateClassMap[currentState]);
            }
          }
        });
      });
    }
    
    // Update status indicator
    window.updateTestStatus(true);
    
    // Show toast notification
    showToast(`Components set to ${newStateIndex === 0 ? 'default' : stateClasses[newStateIndex - 1]} state`);
  }
  
  /**
   * Toggle state for a specific component
   */
  function toggleComponentState(componentBlock) {
    // Similar logic to toggleComponentStates but for a single component
    const stateClasses = ['hover', 'focus', 'active', 'disabled'];
    let stateIndex = parseInt(componentBlock.getAttribute('data-state-index') || '0');
    stateIndex = (stateIndex + 1) % (stateClasses.length + 1);
    
    componentBlock.setAttribute('data-state-index', stateIndex.toString());
    
    // Clear previous states
    stateClasses.forEach(cls => {
      const elements = componentBlock.querySelectorAll(`[data-state]`);
      elements.forEach(el => {
        if (el.dataset.state) {
          el.dataset.state = 'default';
        }
        
        // Remove state classes
        el.classList.remove(
          el.dataset.hoverClass, 
          el.dataset.focusClass, 
          el.dataset.activeClass, 
          el.dataset.disabledClass
        );
      });
    });
    
    // Apply new state if not default
    if (stateIndex > 0) {
      const currentState = stateClasses[stateIndex - 1];
      
      const elements = componentBlock.querySelectorAll(`[data-state]`);
      elements.forEach(el => {
        if (el.dataset.state && !el.hasAttribute('aria-disabled')) {
          el.dataset.state = currentState;
          
          // Add the appropriate class for this state
          const stateClassMap = {
            'hover': el.dataset.hoverClass,
            'focus': el.dataset.focusClass,
            'active': el.dataset.activeClass,
            'disabled': el.dataset.disabledClass
          };
          
          if (stateClassMap[currentState]) {
            el.classList.add(stateClassMap[currentState]);
          }
        }
      });
    }
    
    // Show component-specific notification
    const componentName = componentBlock.querySelector('h3')?.textContent || 'Component';
    showToast(`${componentName} set to ${stateIndex === 0 ? 'default' : stateClasses[stateIndex - 1]} state`);
  }
  
  /**
   * Run animations for all components
   */
  function runComponentAnimations() {
    // Add a sequence of animations to test components
    const componentBlocks = document.querySelectorAll('.component-test-block');
    let delay = 0;
    
    componentBlocks.forEach(block => {
      setTimeout(() => {
        runComponentAnimation(block);
      }, delay);
      
      delay += 300; // Stagger animations
    });
    
    // Update status indicator
    window.updateTestStatus(true);
    
    showToast('Running animations on all components');
  }
  
  /**
   * Run animation for a specific component
   */
  function runComponentAnimation(componentBlock) {
    // Extract component type from heading
    const heading = componentBlock.querySelector('h3')?.textContent?.toLowerCase() || '';
    
    // Add a temporary animation class based on component type
    componentBlock.classList.add('animate-pulse');
    
    setTimeout(() => {
      componentBlock.classList.remove('animate-pulse');
    }, 1000);
    
    // Run component-specific animations
    if (heading.includes('tag')) {
      const tags = componentBlock.querySelectorAll('.tag');
      animateElements(tags);
    } else if (heading.includes('chip')) {
      const chips = componentBlock.querySelectorAll('[data-state]');
      animateElements(chips);
    } else if (heading.includes('tooltip')) {
      const tooltips = componentBlock.querySelectorAll('.tooltip');
      simulateTooltipHover(tooltips);
    } else if (heading.includes('modal')) {
      const modalTrigger = componentBlock.querySelector('#modal-trigger');
      if (modalTrigger) {
        modalTrigger.click();
        setTimeout(() => {
          const closeButton = document.querySelector('#test-modal .cursor-pointer');
          if (closeButton) closeButton.click();
        }, 1500);
      }
    } else if (heading.includes('input')) {
      const inputs = componentBlock.querySelectorAll('input');
      focusElements(inputs);
    } else if (heading.includes('select')) {
      const selects = componentBlock.querySelectorAll('select');
      focusElements(selects);
    }
  }
  
  /**
   * Helper function to animate a collection of elements
   */
  function animateElements(elements) {
    let delay = 0;
    
    elements.forEach(el => {
      setTimeout(() => {
        el.classList.add('animate-pulse');
        
        setTimeout(() => {
          el.classList.remove('animate-pulse');
        }, 700);
      }, delay);
      
      delay += 150;
    });
  }
  
  /**
   * Helper function to simulate focus on elements
   */
  function focusElements(elements) {
    let delay = 0;
    
    elements.forEach(el => {
      setTimeout(() => {
        el.focus();
        
        setTimeout(() => {
          el.blur();
        }, 700);
      }, delay);
      
      delay += 800;
    });
  }
  
  /**
   * Simulate hover on tooltip elements
   */
  function simulateTooltipHover(tooltipTriggers) {
    let delay = 0;
    
    tooltipTriggers.forEach(trigger => {
      setTimeout(() => {
        // Simulate mouseenter
        const mouseEnterEvent = new MouseEvent('mouseenter', {
          bubbles: true,
          cancelable: true,
        });
        trigger.dispatchEvent(mouseEnterEvent);
        
        setTimeout(() => {
          // Simulate mouseleave
          const mouseLeaveEvent = new MouseEvent('mouseleave', {
            bubbles: true,
            cancelable: true,
          });
          trigger.dispatchEvent(mouseLeaveEvent);
        }, 1000);
      }, delay);
      
      delay += 1500;
    });
  }
  
  /**
   * Test interactions for all components
   */
  function testComponentInteractions() {
    // Similar to runComponentAnimations but with focus on interaction testing
    const componentBlocks = document.querySelectorAll('.component-test-block');
    let delay = 0;
    
    componentBlocks.forEach(block => {
      setTimeout(() => {
        testComponentInteraction(block);
      }, delay);
      
      delay += 500; // Stagger interactions
    });
    
    // Update status indicator
    window.updateTestStatus(true);
    
    showToast('Testing interactions on all components');
  }
  
  /**
   * Test interaction for a specific component
   */
  function testComponentInteraction(componentBlock) {
    // Extract component type from heading
    const heading = componentBlock.querySelector('h3')?.textContent?.toLowerCase() || '';
    
    // Show component-specific notification
    const componentName = componentBlock.querySelector('h3')?.textContent || 'Component';
    showToast(`Testing ${componentName} interactions`);
    
    // Run component-specific interaction tests
    if (heading.includes('chip') && heading.includes('multi')) {
      testChipMultiSelectInteraction(componentBlock);
    } else if (heading.includes('tooltip')) {
      testTooltipInteraction(componentBlock);
    } else if (heading.includes('input')) {
      testInputInteraction(componentBlock);
    } else if (heading.includes('select')) {
      testSelectInteraction(componentBlock);
    } else if (heading.includes('modal')) {
      testModalInteraction(componentBlock);
    } else if (heading.includes('alert')) {
      testAlertInteraction(componentBlock);
    } else if (heading.includes('menu') || heading.includes('nav')) {
      testMenuInteraction(componentBlock);
    } else {
      // Generic interaction test for other components
      componentBlock.classList.add('ring-2', 'ring-blue-500');
      setTimeout(() => {
        componentBlock.classList.remove('ring-2', 'ring-blue-500');
      }, 1000);
    }
  }
  
  /**
   * Test ChipMultiSelect interactions
   */
  function testChipMultiSelectInteraction(componentBlock) {
    const chips = componentBlock.querySelectorAll('[data-state]:not([aria-disabled="true"])');
    if (chips.length === 0) return;
    
    // Test removing a chip
    const randomIndex = Math.floor(Math.random() * chips.length);
    const chipToTest = chips[randomIndex];
    
    // Highlight the chip first
    chipToTest.classList.add('ring', 'ring-blue-500');
    
    // Find the remove button
    const removeBtn = chipToTest.querySelector('.chip-remove');
    
    setTimeout(() => {
      // Remove the highlight
      chipToTest.classList.remove('ring', 'ring-blue-500');
      
      // Click the remove button if available
      if (removeBtn) {
        // Animation before clicking
        removeBtn.classList.add('text-red-500');
        
        setTimeout(() => {
          removeBtn.click();
        }, 700);
      }
    }, 1000);
  }