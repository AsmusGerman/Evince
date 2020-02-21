import { moduleMetadata } from '@storybook/angular';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
    title: 'AuthenticationHeader',
    decorators: [
        moduleMetadata({
          imports: [MaterialModule, BrowserAnimationsModule]
        })
      ]
};

export const HeaderFoo = () => ({
    component: HeaderComponent
});