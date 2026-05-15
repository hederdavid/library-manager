const routes = [
  {
    path: '/',
    redirect: '/entrar',
  },
  {
    path: '/entrar',
    component: () => import('layouts/AuthLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/painel',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      title: 'Painel',
      subtitle: 'Visão geral do sistema de empréstimos',
    },
    children: [
      {
        path: '',
        component: () => import('pages/DashboardPage.vue'),
        meta: {
          title: 'Painel',
          subtitle: 'Visão geral do sistema de empréstimos',
        },
      },
      {
        path: '/emprestimos',
        component: () => import('pages/LoansPage.vue'),
        meta: {
          title: 'Empréstimos e Devoluções',
          subtitle: 'Controle de empréstimos de livros',
        },
      },
      {
        path: '/alunos',
        component: () => import('pages/AlunoPage.vue'),
        meta: {
          title: 'Alunos',
          subtitle: 'Gerenciamento de alunos cadastrados',
        },
      },
      {
        path: '/turmas',
        component: () => import('pages/TurmaPage.vue'),
        meta: {
          title: 'Turmas',
          subtitle: 'Gerenciamento de turmas por ano letivo',
        },
      },
      {
        path: '/livros',
        component: () => import('pages/LivroPage.vue'),
        meta: {
          title: 'Livros',
          subtitle: 'Gerenciamento do acervo da biblioteca',
        },
      },
      {
        path: '/materias',
        component: () => import('pages/CursoPage.vue'),
        meta: {
          title: 'Matérias',
          subtitle: 'Gerenciamento de cursos e matérias',
        },
      },
      {
        path: '/campus',
        component: () => import('pages/CampusPage.vue'),
        meta: {
          title: 'Campus',
          subtitle: 'Gerenciamento de campus da instituição',
        },
      },
    ],
  },
  {
    path: '/login',
    redirect: '/entrar',
  },
  {
    path: '/dashboard',
    redirect: '/painel',
  },
  {
    path: '/loans',
    redirect: '/emprestimos',
  },
  {
    path: '/cursos',
    redirect: '/materias',
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
