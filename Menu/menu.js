// Seleção personalizada de empresa
document.addEventListener('DOMContentLoaded', function() {
  const customSelect = document.querySelector('.custom-select');
  const selectSelected = customSelect.querySelector('.select-selected');
  const selectItems = customSelect.querySelector('.select-items');
  const selectOptions = customSelect.querySelectorAll('.select-option');
  
  // Elementos do modal
  const newCompanyModal = document.getElementById('newCompanyModal');
  const modalClose = document.getElementById('modalClose');
  const cancelBtn = document.getElementById('cancelBtn');
  const saveCompanyBtn = document.getElementById('saveCompanyBtn');
  const newCompanyForm = document.getElementById('newCompanyForm');
  
  // Alternar visibilidade do dropdown
  selectSelected.addEventListener('click', function(e) {
    e.stopPropagation();
    selectItems.classList.toggle('select-show');
  });
  
  // Selecionar uma opção
  selectOptions.forEach(option => {
    option.addEventListener('click', function() {
      const value = this.getAttribute('data-value');
      
      if (value === 'new') {
        // Abrir modal para nova empresa
        openNewCompanyModal();
      } else {
        // Selecionar empresa existente
        selectSelected.querySelector('span').textContent = value;
        selectItems.classList.remove('select-show');
        
        // Aqui você pode adicionar lógica adicional quando uma empresa é selecionada
        console.log('Empresa selecionada:', value);
      }
    });
  });
  
  // Fechar dropdown ao clicar fora
  document.addEventListener('click', function() {
    selectItems.classList.remove('select-show');
  });
  
  // Menu do usuário
  const userMenuTrigger = document.getElementById('user-menu-trigger');
  const userMenu = document.getElementById('user-menu');
  
  userMenuTrigger.addEventListener('click', function(e) {
    e.stopPropagation();
    userMenu.classList.toggle('user-menu-show');
  });
  
  // Fechar menu do usuário ao clicar fora
  document.addEventListener('click', function() {
    userMenu.classList.remove('user-menu-show');
  });
  
  // Navegação do menu do usuário
  const userMenuItems = userMenu.querySelectorAll('.user-menu-item');
  userMenuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const action = this.querySelector('span').textContent;
      
      // Aqui você pode adicionar lógica para cada ação do menu
      switch(action) {
        case 'Meu Perfil':
          console.log('Abrindo perfil do usuário');
          // window.location.href = '/perfil';
          break;
        case 'Mensagens':
          console.log('Abrindo mensagens');
          // window.location.href = '/mensagens';
          break;
        case 'Configurações':
          console.log('Abrindo configurações');
          // window.location.href = '/configuracoes';
          break;
        case 'Sair':
          console.log('Saindo do sistema');
          // window.location.href = '/logout';
          break;
      }
      
      // Fechar menu após clicar em uma opção
      userMenu.classList.remove('user-menu-show');
    });
  });
  
  // Funções do Modal de Nova Empresa
  function openNewCompanyModal() {
    newCompanyModal.classList.add('show');
    selectItems.classList.remove('select-show');
  }
  
  function closeNewCompanyModal() {
    newCompanyModal.classList.remove('show');
    newCompanyForm.reset();
  }
  
  // Event listeners do modal
  modalClose.addEventListener('click', closeNewCompanyModal);
  cancelBtn.addEventListener('click', closeNewCompanyModal);
  
  // Fechar modal ao clicar fora
  newCompanyModal.addEventListener('click', function(e) {
    if (e.target === newCompanyModal) {
      closeNewCompanyModal();
    }
  });
  
  // Salvar nova empresa
  saveCompanyBtn.addEventListener('click', function() {
    const companyName = document.getElementById('companyName').value;
    const companyEmail = document.getElementById('companyEmail').value;
    const companyIndustry = document.getElementById('companyIndustry').value;
    
    if (!companyName || !companyEmail || !companyIndustry) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Aqui você pode adicionar a lógica para salvar a nova empresa
    console.log('Nova empresa a ser cadastrada:', {
      name: companyName,
      email: companyEmail,
      industry: companyIndustry
    });
    
    // Simular cadastro bem-sucedido
    setTimeout(() => {
      // Adicionar a nova empresa à lista
      addNewCompanyToList(companyName);
      
      // Fechar modal e limpar formulário
      closeNewCompanyModal();
      
      // Mostrar mensagem de sucesso
      alert(`Empresa "${companyName}" cadastrada com sucesso!`);
    }, 1000);
  });
  
  // Função para adicionar nova empresa à lista
  function addNewCompanyToList(companyName) {
    const selectItems = document.querySelector('.select-items');
    const newCompanyOption = document.querySelector('.select-new-company');
    
    // Criar novo elemento de opção
    const newOption = document.createElement('div');
    newOption.className = 'select-option';
    newOption.setAttribute('data-value', companyName);
    newOption.innerHTML = `
      <div class="option-avatar"></div>
      <span>${companyName}</span>
    `;
    
    // Adicionar evento de clique à nova opção
    newOption.addEventListener('click', function() {
      const value = this.getAttribute('data-value');
      selectSelected.querySelector('span').textContent = value;
      selectItems.classList.remove('select-show');
      console.log('Empresa selecionada:', value);
    });
    
    // Inserir antes do divisor e da opção "Cadastrar nova empresa"
    selectItems.insertBefore(newOption, newCompanyOption.parentNode);
    
    // Selecionar automaticamente a nova empresa
    selectSelected.querySelector('span').textContent = companyName;
  }
  
  // Upload de arquivo - mostrar nome do arquivo selecionado
  const fileInput = document.getElementById('companyLogo');
  const fileUploadLabel = document.querySelector('.file-upload-label');
  
  fileInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      const fileName = this.files[0].name;
      fileUploadLabel.querySelector('span').textContent = fileName;
    }
  });
});