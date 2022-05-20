import { Injectable } from '@nestjs/common';
import { AritcleProvider } from './article.provider';
import { MetaProvider } from './meta.provider';

@Injectable()
export class CategoryProvider {
  constructor(
    private readonly articleProvider: AritcleProvider,
    private readonly metaProvider: MetaProvider,
  ) {}
  async getCategoriesWirhArticle() {
    const allArticles = await this.articleProvider.findAll();
    const categories = await this.getAllCategories();
    const data = {};
    categories.forEach((c) => {
      data[c] = [];
    });
    allArticles.forEach((a) => {
      data[a.category].push(a);
    });
    return data;
  }

  async getAllCategories() {
    const d = await this.metaProvider.getAll();
    return d.categories;
  }

  async getArticlesByCategory(name: string) {
    const d = await this.getCategoriesWirhArticle();
    return d[name] ?? [];
  }
}
