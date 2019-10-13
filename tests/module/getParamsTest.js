const {expect} = require('chai');
const getParams = require('../../src/server/callbacks/getCommandParams');

describe('getParams for getRepository', function (){
	it('возвращает нужные параметры для вызова git в функции getRepository(), request содержит хэш коммита', function () {
		const request = {
			params: {
				commitHash: '23er4f'
			}
		};
	
		expect(getParams(request, 'getRepository')).is.eql(['ls-tree', '23er4f']);
	});
	it('возвращает нужные параметры для вызова git в функции getRepository(), request содержит путь', function () {
		const request = {
			params: {
				path: '1/2/3'
			}
		};
	
		expect(getParams(request, 'getRepository')).is.eql(['ls-tree', 'master:1/2/3']);
	});
	it('возвращает нужные параметры для вызова git в функции getRepository(), request содержит и путь, и хэш коммита', function () {
		const request = {
			params: {
				commitHash: '23er4f',
				path: '1/2/3'
			}
		};
	
		expect(getParams(request, 'getRepository')).is.eql(['ls-tree', '23er4f:1/2/3']);
	});
});

describe('getParams for getFile', function (){
	it('возвращает нужные параметры для вызова git в функции getFile(), request содержит хэш коммита', function () {
		const request = {
			params: {
				commitHash: '23er4f',
				path: '1/1.js'
			}
		};
	
		expect(getParams(request, 'getFile')).is.eql(['show', '23er4f:1/1.js']);
	});
	it('возвращает нужные параметры для вызова git в функции getFile(), request не содержит хэш коммита', function () {
		const request = {
			params: {
				path: '1/1.js'
			}
		};
	
		expect(getParams(request, 'getFile')).is.eql(['show', 'master:1/1.js']);
	});
});