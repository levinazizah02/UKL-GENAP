"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransaksiController = void 0;
const common_1 = require("@nestjs/common");
const transaksi_service_1 = require("./transaksi.service");
const create_transaksi_dto_1 = require("./dto/create-transaksi.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
let TransaksiController = class TransaksiController {
    transaksiService;
    constructor(transaksiService) {
        this.transaksiService = transaksiService;
    }
    create(dto) {
        return this.transaksiService.create(dto);
    }
    findAll() {
        return this.transaksiService.findAll();
    }
    findOne(id) {
        return this.transaksiService.findOne(Number(id));
    }
    updateStatus(id, dto) {
        return this.transaksiService.updateStatus(Number(id), dto.status);
    }
    remove(id) {
        return this.transaksiService.remove(Number(id));
    }
};
exports.TransaksiController = TransaksiController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaksi_dto_1.CreateTransaksiDto]),
    __metadata("design:returntype", void 0)
], TransaksiController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransaksiController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransaksiController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", void 0)
], TransaksiController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransaksiController.prototype, "remove", null);
exports.TransaksiController = TransaksiController = __decorate([
    (0, common_1.Controller)('transaksi'),
    __metadata("design:paramtypes", [transaksi_service_1.TransaksiService])
], TransaksiController);
//# sourceMappingURL=transaksi.controller.js.map