<template>
  <div class="admin">
    <Title
      iconClass="fas fa-cogs"
      title="Administração"
      subtitle="Gerenciamento de artigos, categorias e usuários"
    />
    <div class="admin__tabs">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Artigos" active>
            <ArticlesTab />
          </b-tab>
          <b-tab title="Categorias">
            <CategoriesTab />
          </b-tab>
          <b-tab title="Usuários">
            <UsersTab />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>
<script>
import Title from "@/components/Title.vue";
import ArticlesTab from "@/pages/admin/ArticlesTab.vue";
import CategoriesTab from "@/pages/admin/CategoriesTab.vue";
import UsersTab from "@/pages/admin/UsersTab.vue";

export default {
  name: "Admin",
  components: {
    Title,
    ArticlesTab,
    CategoriesTab,
    UsersTab,
  },
};
</script>

<style>
.admin__tabs {
  margin: 10px;
}
</style>