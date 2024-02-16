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
        'AppName=interop-Trial|Owner=interop|StartDate=2023-11-23|EndDate=2024-01-23|Ref=AdaptableLicense|Trial=true|TS=1700741032831|C=2692006938,2271485454,4261170317,1260976079,180944542,4061129120,1409499958,3452034758',
      primaryKey: 'Id',
      userName: 'Test User',
      adaptableId: 'AdaptableAxesBlotter',
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
        } else {
          // TODO - investigate and remove
          adaptableApi.filterApi.clearColumnFilters();
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
