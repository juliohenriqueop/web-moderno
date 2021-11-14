<template>
  <div class="home">
    <Title
      iconClass="fas fa-home"
      title="Início"
      subtitle="Base de Conhecimento"
    />
    <div class="home__statistics">
      <Statistic
        iconClass="fas fa-user"
        title="Usuários"
        color="#3282CD"
        :value="statistics.usersCount"
      />
      <Statistic
        iconClass="fas fa-folder"
        title="Categorias"
        color="#D54D50"
        :value="statistics.categoriesCount"
      />
      <Statistic
        iconClass="fas fa-file"
        title="Artigos"
        color="#3BC480"
        :value="statistics.articlesCount"
      />
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title";
import Statistic from "@/pages/home/Statistic.vue";
import StatisticsService from "@/services/Statistics";

export default {
  name: "Home",

  components: {
    Title,
    Statistic,
  },

  data: function () {
    return {
      statistics: {
        usersCount: 0,
        categoriesCount: 0,
        articlesCount: 0,
      },
    };
  },

  mounted: async function () {
    this.statistics = await StatisticsService.fetchStatistics();
  },
};
</script>

<style>
.home__statistics {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  padding: 0 20px;
}
</style>