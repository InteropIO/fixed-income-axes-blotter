import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { Root } from 'react-dom/client';
import { GridOptions } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import AdaptableReact, {
  AdaptableApi,
  AdaptableOptions,
  ColumnFilter,
} from '@adaptabletools/adaptable-react-aggrid';
import { columnDefs, defaultColDef } from './columnDefs';
import { rowData, SellBondInterest } from './rowData';
import { agGridModules } from './agGridModules';
import { renderReactRoot } from '../react-18-utils';
import '@interopio/theme-demo-apps/dist/io.applications.css';
import { useIOConnect } from '@interopio/react-hooks';
import { IOConnectBrowser } from '@interopio/browser';
import { IOConnectDesktop } from '@interopio/desktop';

const renderWeakMap: WeakMap<HTMLElement, Root> = new WeakMap();

const Revision = 2;

export const AxesBlotter = () => {
  const gridOptions = useMemo<GridOptions<SellBondInterest>>(
    () => ({
      defaultColDef,
      columnDefs,
      rowData,
      sideBar: true,
      suppressMenuHide: true,
      enableRangeSelection: true,
      enableCharts: true,
    }),
    [],
  );
  const adaptableOptions = useMemo<AdaptableOptions<SellBondInterest>>(
    () => ({
      licenseKey:
        'AppName=Interop-Universal|Owner=Interop|StartDate=2024-02-19|EndDate=2024-08-19|Ref=AdaptableLicense|TS=1708358445822|C=3338536950,2753137919,1260976079,3157789641,3548769197,2612951722,1814935034',
      primaryKey: 'Id',
      userName: 'Test User',
      adaptableId: 'AdaptableAxesBlotter',
      filterOptions: {
        clearFiltersOnStartUp: true,
      },
      predefinedConfig: {
        Dashboard: {
          Revision,
          DashboardTitle: 'Sell-side Bond Interests',
        },
        Theme: {
          Revision,
          CurrentTheme: 'dark',
        },
        FormatColumn: {
          Revision,
          FormatColumns: [
            {
              Scope: {
                ColumnIds: ['Quantity'],
              },
              DisplayFormat: {
                Formatter: 'NumberFormatter',
                Options: {
                  Suffix: 'M',
                  Multiplier: 0.000001,
                },
              },
            },
            {
              Scope: {
                DataTypes: ['Number'],
              },
              CellAlignment: 'Right',
            },
          ],
        },
      },
    }),
    [],
  );

  const adaptableApiRef = React.useRef<AdaptableApi>();
  const ISIN_CONTEXT = 'ISIN_CONTEXT';

  useEffect(() => {
    async function setMyWorkspaceId() {
      const { io }: { io: IOConnectBrowser.API | IOConnectDesktop.API } =
        window as any;

      const inWsp = await io.workspaces?.inWorkspace();
      if (!inWsp) {
        return;
      }

      const myWorkspace = await io.workspaces?.getMyWorkspace();
      await io.windows.my().updateContext({
        workspaceId: myWorkspace?.id,
      });
    }

    setMyWorkspaceId();
  }, []);

  useIOConnect(async (io) => {
    const workspaceId = (await io.windows.my().getContext()).workspaceId;

    const workspace =
      (await io.workspaces?.getAllWorkspaces())?.find(
        ({ id }) => id === workspaceId,
      ) || (await io.workspaces?.getMyWorkspace());
    if (!workspace) return;

    return workspace.onContextUpdated((context) => {
      const adaptableApi = adaptableApiRef.current;

      if (adaptableApi) {
        if (ISIN_CONTEXT in context && adaptableApi) {
          const isinValue = context[ISIN_CONTEXT].id?.ISIN;
          const isinFilter: ColumnFilter = {
            ColumnId: 'ISIN',
            Predicate: {
              PredicateId: 'Is',
              Inputs: [isinValue],
            },
          };
          adaptableApi.filterApi.setColumnFilters([isinFilter]);
        }
      }
    });
  });

  return (
    <div
      className={'flex h-screen flex-col'}
      style={
        {
          '--ab-dashboard-header__background': 'hsl(191deg, 50%, 30%)',
        } as React.CSSProperties
      }
    >
      <AdaptableReact
        className={'flex-none'}
        gridOptions={gridOptions}
        adaptableOptions={adaptableOptions}
        renderReactRoot={(node, container) =>
          renderReactRoot(node, container, renderWeakMap)
        }
        onAdaptableReady={({ adaptableApi }) => {
          adaptableApiRef.current = adaptableApi;
        }}
      />
      <div className="ag-tick42 flex-1">
        <AgGridReact gridOptions={gridOptions} modules={agGridModules} />
      </div>
    </div>
  );
};
