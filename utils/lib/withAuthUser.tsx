import React, { ComponentType, PropsWithChildren, useState } from 'react';

const withAuthUser = <T extends PropsWithChildren>(WrappedComponent: ComponentType<T>) => {

    let Comp = (props: T) => <WrappedComponent {...props} />
    return Comp
}

export default withAuthUser