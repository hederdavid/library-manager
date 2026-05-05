<template>
  <div class="row q-col-gutter-lg q-mb-xl">
    <div class="col-12 col-sm-6 col-md-3">
      <StatCard
        title="Total de Livros"
        :value="stats?.totalBooks?.value || 14"
        changeText="+3 este mês"
        changeIcon="trending_up"
        description="8 disponíveis"
        icon="menu_book"
        theme="green"
      />
    </div>

    <div class="col-12 col-sm-6 col-md-3">
      <StatCard
        title="Empréstimos Ativos"
        :value="stats?.activeLoans?.value || 6"
        changeText="+5 esta semana"
        changeIcon="trending_up"
        description="de 12 alunos cadastrados"
        icon="swap_horiz"
        theme="blue"
      />
    </div>

    <div class="col-12 col-sm-6 col-md-3">
      <StatCard
        title="Devoluções Atrasadas"
        :value="stats?.overdueReturns?.value || 5"
        changeText="Crítico"
        changeIcon="warning"
        description="requerem atenção imediata"
        icon="report_problem"
        theme="red"
      />
    </div>

    <div class="col-12 col-sm-6 col-md-3">
      <StatCard
        title="Alunos c/ Pendência"
        :value="stats?.pendingStudents?.value || 5"
        changeText="Verificar"
        changeIcon="warning"
        description="de 12 alunos"
        icon="people"
        theme="orange"
      />
    </div>
  </div>
</template>

<script setup>
import StatCard from 'src/components/StatCard.vue'

defineProps({
  stats: Object
})
</script>
