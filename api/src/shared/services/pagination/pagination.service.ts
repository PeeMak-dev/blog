import { QueryOptions } from './../../../models/query-option.interface';
import { Injectable } from '@nestjs/common';
import { Meta } from 'src/models/meta.interface';
import { Links } from 'src/models/links.interface';

@Injectable()
export class PaginationService {
	paginate({
		options,
		route,
		docCount,
	}: {
		options: QueryOptions;
		route: string;
		docCount: number;
	}) {
		const limit = Number(options.limit);
		const currentPage = Number(options.page);
		const offset = Number((currentPage - 1) * limit);
		const totalPages = this.calcTotalPage({ docCount, limit });
		const filter = options.filter ? options.filter : '';

		const meta: Meta = this.generateMetadata({
			limit,
			offset,
			currentPage,
			totalPages,
			docCount,
		});

		const links: Links = this.generateLinks({
			limit,
			currentPage,
			totalPages,
			route,
		});

		return { filter, offset, limit, meta, links };
	}

	private generateMetadata({
		limit,
		currentPage,
		totalPages,
		docCount,
		offset,
	}: {
		limit: number;
		currentPage: number;
		totalPages: number;
		docCount: number;
		offset: number;
	}): Meta {
		const meta: Meta = {
			limit: limit ? limit : null,
			estimatedDocs: docCount,
			offset: offset,
			currentPage: currentPage ? currentPage : 1,
			totalPages: currentPage ? totalPages : 1,
		};

		return meta;
	}

	private generateLinks({
		limit,
		currentPage,
		totalPages,
		route,
	}: {
		limit: number;
		currentPage: number;
		totalPages: number;
		route: string;
	}): Links {
		if (limit) {
			const links: Links = {
				first: `${route}?page=${1}&limit=${limit}`,
				next:
					currentPage < totalPages
						? `${route}?page=${Number(currentPage) + 1}&limit=${limit}`
						: `${route}?page=${totalPages}&limit=${limit}`,
				previous:
					currentPage > 1
						? `${route}?page=${Number(currentPage) - 1}&limit=${limit}`
						: null,
				last: `${route}?page=${totalPages}&limit=${limit}`,
			};

			return links;
		} else {
			const links: Links = {
				first: null,
				next: null,
				previous: null,
				last: null,
			};

			return links;
		}
	}

	private calcTotalPage({
		docCount,
		limit,
	}: {
		docCount: number;
		limit: number;
	}): number {
		const remainder = docCount % limit;

		if (remainder > 0) {
			return Math.floor(docCount / limit) + 1;
		} else {
			return Math.floor(docCount / limit);
		}
	}
}
