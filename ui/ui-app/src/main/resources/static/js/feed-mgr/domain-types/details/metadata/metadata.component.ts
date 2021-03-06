import * as angular from "angular";

import {moduleName} from "../../module-name";
import {DomainTypeDetailsService} from "../../services/details.service";
import {AbstractSectionComponent} from "../abstract-section.component";

/**
 * Metadata section of the {@link DomainTypeDetailsComponent}.
 */
export class DomainTypeMetadataDetailsComponent extends AbstractSectionComponent {

    static readonly $inject: string[] = ["$mdDialog", "DomainTypeDetailsService", "FeedTagService"];

    constructor(private $mdDialog: angular.material.IDialogService, DomainTypeDetailsService: DomainTypeDetailsService, private FeedTagService: any) {
        super(DomainTypeDetailsService);
    }

    /**
     * Indicates if the domain type can be deleted. The main requirement is that the domain type exists.
     */
    get canDelete() {
        return !this.isNew;
    }

    /**
     * Saves changes to the model.
     */
    onSave() {
        this.onUpdate({
            title: this.editModel.title,
            description: this.editModel.description,
            icon: this.editModel.icon,
            iconColor: this.editModel.iconColor
        });
    }

    /**
     * Shows the icon picker dialog.
     */
    showIconPicker() {
        this.$mdDialog.show({
            controller: "IconPickerDialog",
            templateUrl: "../../../../common/icon-picker-dialog/icon-picker-dialog.html",
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            fullscreen: true,
            locals: {
                iconModel: this.editModel
            }
        }).then((msg: any) => {
            if (msg) {
                this.editModel.icon = msg.icon;
                this.editModel.iconColor = msg.color;
            }
        });
    }
}

angular.module(moduleName)
    .component("domainTypeMetadataDetails", {
        bindings: {
            allowEdit: "<",
            model: "<"
        },
        controller: DomainTypeMetadataDetailsComponent,
        templateUrl: "./metadata.component.html"
    });
