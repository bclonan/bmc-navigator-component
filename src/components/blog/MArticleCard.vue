<template>
  <article
    class="article-card"
    :class="[
      'article-card--' + theme,
      { 'article-card--featured': isFeatured },
    ]"
  >
    <h2 class="article-card__title">{{ article.title }}</h2>
    <p class="article-card__excerpt">{{ article.excerpt }}</p>
    <router-link :to="`/blog/${article.slug}`" class="article-card__read-more">
      Read More
    </router-link>
  </article>
</template>

<script>
export default {
  name: "MArticleCard",
  props: {
    article: {
      type: Object,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.article-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
}
.article-card--featured {
  border-color: #007bff;
  background-color: #f0f8ff;
}
.article-card__title {
  font-size: 1.5em;
  margin-bottom: 8px;
}
.article-card__excerpt {
  font-size: 1em;
  color: #666;
}
.article-card__read-more {
  color: #007bff;
  text-decoration: none;
}
.article-card__read-more:hover {
  text-decoration: underline;
}
</style>
